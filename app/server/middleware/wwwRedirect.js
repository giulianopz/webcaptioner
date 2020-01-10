module.exports = function(req, res, next) {
  const host = req.headers.host;

  if (process.env.NODE_ENV === 'production' && host.contains('www.')) {
    res.writeHead(301, { Location: host.replace('www.', '') + req.url });
    return res.end();
  }

  return next();
};
