const express = require('express');
const validationHandler = require('../middlewares/validation.handler');
const { createCustomerSchema } = require('../schemas/customer.schema');
const CustomersService = require('../services/customer.service');

const router = express.Router();
const service = new CustomersService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json({
      message: 'Customers listed',
      data: customers,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const customer = await service.findOne(id);
    res.json({
      message: `Customer with id ${id} retrieved`,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createCustomerSchema),
  async (req, res, next) => {
    const customer = req.body;
    try {
      const newCustomer = await service.create(customer);
      res.json({
        message: 'Customer created',
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
