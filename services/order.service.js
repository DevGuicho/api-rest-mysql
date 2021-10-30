const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class OrdersService {
  constructor() {}

  async find() {
    const orders = await models.Order.findAll()
    return orders
  }

  async findByUser(userId) {
    const order = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{ association: 'customer', include: ['user'] }]
    })
    if (!order) {
      throw boom.notFound('Order doesnt exists')
    }
    return order
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items']
    })
    if (!order) {
      throw boom.notFound('Order doesnt exists')
    }
    return order
  }

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }
}

module.exports = OrdersService
