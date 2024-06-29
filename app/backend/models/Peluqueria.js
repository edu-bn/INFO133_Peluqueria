const pool = require('../config/db.config');

const getAllPeluquerias = async () => {
    const query = 'SELECT * FROM peluqueria';
    const { rows } = await pool.query
    (query);
    return rows;
}

module.exports = {
    getAllPeluquerias,
};