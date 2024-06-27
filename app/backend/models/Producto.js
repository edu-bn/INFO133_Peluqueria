
// models/Producto.js
const pool = require('../config/db.config');

const getAllProductos = async () => {
  const query = 'SELECT * FROM producto';
  const { rows } = await pool.query(query);
  return rows;
};

const getProductoById = async (id) => {
  const query = 'SELECT * FROM producto WHERE id_producto = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const createProducto = async (nombre, valor) => {
  const query = 'INSERT INTO producto (nombre, valor) VALUES ($1, $2) RETURNING *';
  const values = [nombre, valor];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProducto = async (id, nombre, valor) => {
  const query = 'UPDATE producto SET nombre = $2, valor = $3 WHERE id_producto = $1 RETURNING *';
  const values = [id, nombre, valor];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
};
