/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom')
const { ValidationError } = require('sequelize')
const { isProd } = require('../config')

function withErrorStack(error, stack) {
  if (!isProd) {
    return { ...error, stack }
  }
  return error
}

function logErrors(err, req, res, next) {
  console.log(err)
  next(err)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation())
  }
  next(err)
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err
  res.status(statusCode).json(withErrorStack(payload, err.stack))
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
  ormErrorHandler
}
