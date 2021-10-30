const { Pool } = require('pg');
const { dbHost, dbPort, dbUser, dbPassword, dbName } = require('../config');

const uri = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
  connectionString: uri,
});

module.exports = pool;
