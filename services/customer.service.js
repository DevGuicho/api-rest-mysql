const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

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
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }
}

module.exports = CustomersService;
