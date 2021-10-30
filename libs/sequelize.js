const { Sequelize } = require('sequelize');

const { isProd, dbUrl } = require('../config');
const setupModels = require('../db/models');

const options = {
  dialect: isProd ? 'postgres' : 'mysql',
};
if (isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
  options.logging = false;
}

const sequelize = new Sequelize(dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
