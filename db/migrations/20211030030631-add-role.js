'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};