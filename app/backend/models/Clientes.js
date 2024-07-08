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

const addCliente = async (rut, nombre, apellido, telefono, id_comuna) => {
    const query = 'INSERT INTO cliente (rut_cliente, nombre, apellido, telefono, id_comuna) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [rut, nombre, apellido, telefono, id_comuna];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    getAllClientes,
    getClienteByRut,
    addCliente
};