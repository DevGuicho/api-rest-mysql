/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err.message));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).json(payload);
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
