function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  next();
}

module.exports = cors;