const pool = require('../config/db.config');

const getAllClientes = async () => {
    const query = 'SELECT * FROM cliente';
    const { rows } = await pool.query(query);
    return rows;
}

const getClienteByRut = async (rut) => {
    const query = 'SELECT * FROM cliente WHERE rut_cliente = $1';
    const values = [rut];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    getAllClientes,
    getClienteByRut
};