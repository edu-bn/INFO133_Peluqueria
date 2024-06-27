// db.config.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'peluqueria',
  password: '1234',
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = pool;
