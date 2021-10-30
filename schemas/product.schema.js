const Joi = require('joi');

const idSchema = Joi.number().integer();
const name = Joi.string().min(3).max(60);
const price = Joi.number().min(10);
const priceMin = Joi.number();
const priceMax = Joi.number();
const description = Joi.string().max(90).min(10);
const image = Joi.string().uri();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: idSchema.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId: idSchema,
});

const getProductSchema = Joi.object({
  id: idSchema.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min: priceMin,
  price_max: priceMax.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
