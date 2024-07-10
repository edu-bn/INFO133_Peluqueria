const pool = require('../config/db.config');

const getAllServicios = async () => {
    const query = 'SELECT * FROM servicio';
    const { rows } = await pool.query(query);
    return rows;
}


module.exports = {
    getAllServicios
};