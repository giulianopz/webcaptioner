import { customAlphabet, nanoid } from 'nanoid';
const nanoidRoom = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghjkmnpqrstuvwxyz-', 8);
const rooms = require('express').Router();
const redis = require('./../../redis');
const getSubscriberCount = require('./getSubscriberCount');
const openGraphScraper = require('open-graph-scraper');
const url = require('url');
const twitch = require('./twitch');

const expireHours = 48;

rooms.get('/', async (req, res, next) => {
//   if (req.query.customDomain) {
//     // Find the room for this given custom domain
//     let db = firebaseAdmin().firestore();
//
//     db.collectionGroup('privileges')
//       .where('customDomain', '==', req.query.customDomain)
//       .get()
//       .then((querySnapshot) => {
//         if (querySnapshot.size) {
//           querySnapshot.forEach((doc) => {
//             let {
//               customDomain
//             } = doc.data();
//
//             if (customDomain) {
//               res.send(customDomain);
//               return;
//             }
//           });
//         }
//
//         res.sendStatus(404);
//       });
//     return;
//   }



  if (!req.query.token || !process.env.ADMIN_TOKEN || req.query.token !== process.env.ADMIN_TOKEN) {
    // Require admin token
    res.sendStatus(404);
    return;
  }

  let redisClient = redis.getSharedClient();
  if (!redisClient || !redisClient.connected) {
    res.sendStatus(500);
    return;
  }

  let rooms = [];
  let cursor = '0'; // initial value for redis SCAN cursor

  function getRooms(cursor) {
    redisClient.scanAsync(cursor, 'MATCH', 'rooms:*')
      .then(async ([newCursor, newResults]) => {
        let resultsWithTTLs = newResults.map(async (roomKey) => {

          // Get the TTL
          let ttl = await new Promise((resolve, reject) => {
            redisClient.ttlAsync(roomKey)
              .then(ttl => resolve(ttl));
          });

          return {
            id: roomKey.replace('rooms:', ''), // was "rooms:rPWoIvAy"
            expireDate: Date.now() + (ttl * 1000),
            ttl,
            backlink: await redisClient.hgetAsync(roomKey, 'backlink'),
            subscriberCount: await getSubscriberCount(roomKey),
          };
        });

        rooms = rooms.concat(await Promise.all(resultsWithTTLs));

        if (newCursor !== '0') {
          // Scan again until cursor === '0'
          getRooms(newCursor);
        } else {
          res.send(JSON.stringify({
            rooms
          }));
          return;
        }
      });
  }

  getRooms(cursor);
});

rooms.post('/', async (req, res, next) => {
  let redisClient = redis.getSharedClient();
  if (!redisClient || !redisClient.connected) {
    res.sendStatus(500);
    return;
  }

  let roomKey, roomId, roomKeyAlreadyExists;
  if (req.body.urlType === 'vanity') {
    if (!req.body.idToken) {
      // Need a user token to continue
      res.sendStatus(403);
      return;
    }

    res.sendStatus(403);
    return;
//     // Authenticate (verify ID token)
//     let decodedToken;
//     try {
//       decodedToken = await firebaseAdmin().auth().verifyIdToken(req.body.idToken);
//     } catch (e) {
//       // Invalid token ID
//       res.sendStatus(403);
//       return;
//     }
//
//     if (!decodedToken.uid) {
//       res.sendStatus(403);
//       return;
//     }
//
//     // Check that they're allowed to request this vanity URL
//     let db = firebaseAdmin().firestore();
//     let vanity = await db.collection('users')
//       .doc(decodedToken.uid)
//       .collection('privileges')
//       .doc('share')
//       .get()
//       .then((document) => {
//         if (document.exists) {
//           return document.data().vanity;
//         }
//       });
//
//     if (vanity) {
//       // They have a vanity URL
//       roomId = vanity;
//       roomKey = 'rooms:' + roomId;
//     } else {
//       // They don't have a vanity URL
//       res.sendStatus(403);
//       return;
//     }
  } else {
    do {
      roomId = nanoidRoom();
      roomKey = 'rooms:' + roomId;
      roomKeyAlreadyExists = await redisClient.existsAsync(roomKey) === 1;
    }
    while (roomKeyAlreadyExists); // repeat roomkey generation on collision
  }
  const ownerKey = nanoid(50);

  const backlink = req.body.backlink ? ['backlink', req.body.backlink] : [];
  const customWelcomeMessageAuthor = req.body.customWelcomeMessageAuthor ? ['customWelcomeMessageAuthor', req.body.customWelcomeMessageAuthor] : [];

  // Limit to 1000 characters for safety; currently length is around 350-400 characters
  const appearance = req.body.appearance && req.body.appearance.length <= 1000 ? ['appearance', req.body.appearance] : [];

  redisClient.hmset(roomKey, 'ownerKey', ownerKey, ...backlink, ...appearance, ...customWelcomeMessageAuthor);

  if (req.body.urlType === 'random') {
    // Random URLs expire
    redisClient.expire(roomKey, 60 * 60 * expireHours);
  }

  res.send(JSON.stringify({
    roomId,
    ownerKey,
    url: `${process.env.HOST_PUBLIC}/s/${roomId}`,

    // Vanity URLs never expire
    expires: req.body.urlType === 'random',
    expireDate: req.body.urlType === 'random' ?
      (new Date((new Date()).getTime() + (1000 * 60 * 60 * expireHours))) : null,
  }));
  return;
});

rooms.get('/:roomId', async (req, res) => {
  let redisClient = redis.getSharedClient();
  if (!redisClient || !redisClient.connected) {
    res.sendStatus(500);
    return;
  }

  const {
    roomId
  } = req.params;


  if (!roomId) {
    res.sendStatus(404);
    return;
  }

  const roomKey = 'rooms:' + roomId;

  const roomExists = await redisClient.existsAsync(roomKey) === 1;

  if (roomExists) {
    let appearance, customWelcomeMessageAuthor;

    try {
      appearance = await redisClient.hgetAsync(roomKey, 'appearance');
      appearance = JSON.parse(appearance);
    } catch (e) {
      // couldn't parse
      appearance = null;
    }

    customWelcomeMessageAuthor = await redisClient.hgetAsync(roomKey, 'customWelcomeMessageAuthor');

    res.send(JSON.stringify({
      appearance,
      customWelcomeMessageAuthor,
    }));
  } else {
    res.sendStatus(404);
  }
});

rooms.get('/:roomId/backlink', async (req, res) => {
  let redisClient = redis.getSharedClient();
  if (!redisClient || !redisClient.connected) {
    res.sendStatus(500);
    return;
  }

  const {
    roomId
  } = req.params;


  if (!roomId) {
    res.sendStatus(404);
    return;
  }

  const roomKey = 'rooms:' + roomId;

  const roomExists = await redisClient.existsAsync(roomKey) === 1;

  if (roomExists) {
    let backlink = await redisClient.hgetAsync(roomKey, 'backlink'),
      backlinkData;

    try {
      if (backlink) {
        backlinkParts = url.parse(backlink);
        const isTwitchLink = backlinkParts.host.endsWith('twitch.tv');
        let twitchUsername;
        if (isTwitchLink) {
          // Use the Twitch API to get info since the open graph tags
          // aren't set correctly on initial page request for Twitch links.
          twitchUsername = backlinkParts.path.split('/')[1];
          try {
            let {
              title,
              author,
              description,
              imageUrl
            } = await twitch.getChannel(twitchUsername);
            backlinkData = {
              title,
              author,
              description,
              imageUrl,
              url: backlink,
            };
          } catch (e) {
            // Could not get Twitch information
          }
        }

        if (!backlinkData) {
          // Scrape non-Twitch URL, or scrape Twitch URL that we couldn't use
          // the API with.
          let openGraph = await openGraphScraper({
            url: backlink,
            'timeout': 4000
          });

          if (openGraph.data.ogImage.url) {
            if (!/^(?:f|ht)tps?\:\/\//.test(openGraph.data.ogImage.url)) {
              openGraph.data.ogImage.url = "https:" + openGraph.data.ogImage.url;
            }
          }

          backlinkData = {
            title: (twitchUsername ? twitchUsername : null) || openGraph.data.ogTitle || openGraph.data.ogSiteName || backlink,
            description: (twitchUsername ? 'Twitch.tv' : null) || openGraph.data.ogDescription,
            imageUrl: openGraph.data.ogImage.url,
            url: backlink,
          };
        }

//         if (backlinkData.imageUrl) {
//           try {
//             const palettes = await vibrant.from(backlinkData.imageUrl).getPalette();
//
//             // Some of the palettes returned might be null. Find the first
//             // non-null one in this order.
//             const palette = [
//               palettes.Vibrant,
//               palettes.LightVibrant,
//               palettes.DarkVibrant,
//               palettes.Muted,
//               palettes.LightMuted,
//               palettes.DarkMuted,
//             ].find((p) => p);
//
//             if (palette) {
//               backlinkData.colors = {
//                 background: palette.getHex(),
//                 text: palette.getBodyTextColor(),
//               };
//             }
//           } catch (e) {}
//         }
      }
    } catch (error) {
      // Unable to get info. Send default empty object.
      backlink = {
        colors: null,
      };
    }

    res.send(JSON.stringify({
      backlink: backlinkData,
    }));
  } else {
    res.sendStatus(404);
  }
});

rooms.delete('/:roomId', async (req, res) => {
  let redisClient = redis.getSharedClient();
  if (!redisClient || !redisClient.connected) {
    res.sendStatus(500);
    return;
  }

  const {
    roomId
  } = req.params;
  const {
    ownerKey
  } = req.query;

  if (!roomId || !ownerKey) {
    res.sendStatus(403);
    return;
  }
  const roomKey = 'rooms:' + roomId;
  const ownerKeyForRoom = await redisClient.hgetAsync(roomKey, 'ownerKey');

  if (!ownerKeyForRoom) {
    // That room ID doesn't exist (or for some reason it doesn't have an owner key)
    res.sendStatus(404);
  } else if (ownerKeyForRoom === ownerKey) {
    // Delete this room
    await redisClient.delAsync(roomKey);
    res.sendStatus(200);
  } else {
    // Room exists, but correct ownerKey wasn't given
    res.sendStatus(403);
  }
});

module.exports = rooms;
