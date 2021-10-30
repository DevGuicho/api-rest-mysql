const boom = require('@hapi/boom');
const { apiKey } = require('../config');

function checkApiKey(req, res, next) {
  const apiKeyReq = req.headers['api'];
  if (apiKeyReq === apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = checkApiKey;
