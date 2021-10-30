const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async find() {
    const rta = await models.User.findAll({ include: ['customer'] });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.badRequest('User doest exist');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(changes);
    return userUpdated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = UsersService;
