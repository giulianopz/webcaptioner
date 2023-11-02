import url from 'url'

export default function (req, res, next) {
  const requestUrl = url.parse(req.url);
  if (!requestUrl.pathname.endsWith('.map')) {
    // Not a .map file
    next();
  } else {
    // Don't show it
    res.writeHead(403);
    res.end();
  }
}
