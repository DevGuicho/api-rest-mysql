const { Sequelize } = require('sequelize');

const { dbHost, dbPort, dbUser, dbPassword, dbName } = require('../config');
const setupModels = require('../db/models');

const uri = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(uri, {
  dialect: 'mysql',
});

setupModels(sequelize);

module.exports = sequelize;
