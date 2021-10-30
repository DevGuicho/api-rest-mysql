const { dbUrl } = require('../config');

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'mysql',
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
