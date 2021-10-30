const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const role = Joi.string().min(5);
const id = Joi.string().alphanum();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role,
});

const updateUserSchema = Joi.object({
  email,
  password,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
