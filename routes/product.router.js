const express = require('express');

const ProductsService = require('../services/product.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  validationHandler(queryProductSchema, 'query'),
  async (req, res) => {
    const products = await service.find(req.query);
    res.json({
      message: 'products listed',
      data: products,
    });
  }
);

router.get(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.findOne(id);

      res.json({
        message: `Product with id ${id} listed`,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createProductSchema),
  async (req, res, next) => {
    const product = req.body;

    try {
      const newProduct = await service.create(product);

      res.status(201).json({
        message: 'Product created',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;

    try {
      const updatedProduct = await service.update(id, product);

      res.json({
        message: `Product with id ${id} updated`,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const productDeleted = await service.delete(id);
      res.json({
        message: `Product with ${id} deleted`,
        data: productDeleted,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
