const express = require('express');

const emailHandler = require('../middlewares/email.handler');
const validationHandler = require('../middlewares/validation.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');
const UsersService = require('../services/user.service');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json({
      message: 'Users listed',
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await service.findOne(id);

    res.json({
      message: `User with id ${id} retrieved`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createUserSchema),
  emailHandler,
  async (req, res, next) => {
    const user = req.body;
    try {
      const newUser = await service.create(user);
      res.json({
        message: 'User created',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;

    try {
      const userUpdated = await service.update(id, user);

      res.json({
        message: `User with id ${id} updated`,
        data: userUpdated,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      await service.delete(id);
      res.json({
        message: `User with id ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
