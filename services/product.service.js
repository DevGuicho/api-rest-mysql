const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { price, limit, offset, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = Number(limit);
      options.offset = Number(offset);
    }
    if (price) {
      options.where.price = price;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(data) {
    const product = await models.Product.create(data);
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);

    const productUpdated = await product.update(changes);

    return productUpdated;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id;
  }
}
module.exports = ProductsService;
