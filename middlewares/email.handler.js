const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

async function emailHandler(req, res, next) {
  const { email } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (user) {
    next(boom.badRequest('Email already Exist'));
  } else {
    next();
  }
}

module.exports = emailHandler;
