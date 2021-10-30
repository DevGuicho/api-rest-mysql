const { dbUrl } = require('../config');

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'mysql',
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
