function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization');

  next();
}

module.exports = cors;