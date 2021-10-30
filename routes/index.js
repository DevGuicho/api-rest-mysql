const express = require('express');

const productsRouter = require('./product.router');
const userRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customer.router');
const orderRouter = require('./order.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
