const pool = require('../config/db.config');

const getAllComunas = async () => {
  const query = 'SELECT * FROM comuna';
  const { rows } = await pool.query(query);
    return rows;
};

const getComunasByRegion = async (id) => {
    const query = 'SELECT * FROM comuna WHERE id_region = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows;
}
