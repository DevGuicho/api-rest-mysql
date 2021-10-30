const Joi = require('joi');

const customerId = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const addItemSchema = Joi.object({
  orderId: customerId.required(),
  productId: customerId.required(),
  amount: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId,
});

const getOrderSchema = Joi.object({
  id: customerId,
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
};
