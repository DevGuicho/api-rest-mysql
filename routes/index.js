const express = require('express');

const productsRouter = require('./product.router');
const userRouter = require('./users');
const categoriesRouter = require('./categories');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
