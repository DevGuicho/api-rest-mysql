const { dbHost, dbPort, dbUser, dbPassword, dbName } = require('../config');

const uri = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development: {
    url: uri,
    dialect: 'mysql',
  },
  production: {
    url: uri,
    dialect: 'mysql',
  },
};
