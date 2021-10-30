const express = require('express');
const validationHandler = require('../middlewares/validation.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');
const OrdersService = require('../services/order.service');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.json({
    message: 'Orders listed',
    data: orders,
  });
});

router.get(
  '/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const order = await service.findOne(id);

      res.json({
        message: `Order with id ${id} listed`,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createOrderSchema),
  async (req, res, next) => {
    const order = req.body;

    try {
      const newOrder = await service.create(order);

      res.status(201).json({
        message: 'Order created',
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validationHandler(addItemSchema),
  async (req, res, next) => {
    const order = req.body;

    try {
      const newItem = await service.addItem(order);

      res.status(201).json({
        message: 'Order created',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
