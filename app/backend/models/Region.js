const pool = require('../config/db.config');

const getAllRegiones = async () => {
    const query = 'SELECT * FROM region';
    const { rows } = await pool.query(query);
    return rows;
}

const getRegionById = async (id) => {
    const query = 'SELECT * FROM region WHERE id_region = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    getAllRegiones,
    getRegionById
};