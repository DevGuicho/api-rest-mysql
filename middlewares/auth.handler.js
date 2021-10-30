const boom = require('@hapi/boom')
const { apiKey } = require('../config')

function checkApiKey(req, res, next) {
  const apiKeyReq = req.headers['api']
  if (apiKeyReq === apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkAdminRole(req, res, next) {
  const { role } = req.user
  if (role === 'admin') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const { role } = req.user

    if (roles.includes(role)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkAdminRole, checkApiKey, checkRoles }
