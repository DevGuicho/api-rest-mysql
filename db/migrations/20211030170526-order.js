'use strict';

const { ORDER_TABLE, OrderSchema } = require('../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  down: async (queryInterface) => {
    queryInterface.dropTable(ORDER_TABLE);
  },
};
