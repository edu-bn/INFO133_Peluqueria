const pool = require('../config/db.config');

const getAllRegiones = async () => {
    const query = 'SELECT * FROM region';
    const { rows } = await pool.query(query);
    return rows;
}