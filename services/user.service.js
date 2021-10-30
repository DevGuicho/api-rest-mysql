const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

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
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hashPassword,
    });
    delete newUser.dataValues.password;
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
