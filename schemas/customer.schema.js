const Joi = require('joi');

const name = Joi.string().max(60);
const lastName = Joi.string().max(60);
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().max(14);
const userId = Joi.number();
const id = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
