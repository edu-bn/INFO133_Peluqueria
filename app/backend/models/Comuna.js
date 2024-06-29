const pool = require('../config/db.config');

const getAllComunas = async () => {
  const query = 'SELECT * FROM comuna';
  const { rows } = await pool.query(query);
    return rows;
};

const getComunaById = async (id) => {
  const query = 'SELECT * FROM comuna WHERE id_comuna = $1';
  const values = [id];
  const { rows } = await pool.query
  (query, values);
  return rows[0];
};

const getComunaByRegion = async (id) => {
  const query = 'SELECT * FROM comuna WHERE id_region = $1';
  const values = [id];
  const { rows } = await pool.query
  (query, values);
  return rows;
};

module.exports = {
  getAllComunas,
  getComunaById,
  getComunaByRegion
};