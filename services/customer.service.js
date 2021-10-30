const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const { models } = require('../libs/sequelize');

class CustomersService {
  async find() {
    const customers = await models.Customer.findAll({ include: ['user'] });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, { include: ['user'] });
    if (!customer) {
      throw boom.notFound('Customer doest exist');
    }
    return customer;
  }

  async create(data) {
    const hashPassword = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hashPassword,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }
}

module.exports = CustomersService;
