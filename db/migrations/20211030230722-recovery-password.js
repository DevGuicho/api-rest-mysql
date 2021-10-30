'use strict'

const { USER_TABLE, UserSchema } = require('../models/user.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      USER_TABLE,
      'recovery_token',
      UserSchema.recoveryToken
    )
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token')
  }
}
