const { Pool } = require('pg');

let pool = null;
const connectDb = (host, port, user, password, database) => {
  pool = new Pool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
  });
  return pool.connect();
};

const getConnection = () => {
  if (!pool) {
    throw new Error('Database connection not established');
  }
  return pool;
};

module.exports = { connectDb, getConnection };