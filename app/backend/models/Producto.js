const pool = require('../config/db.config');

const getAllProductos = async () => {
  const query = 'SELECT * FROM producto';
  const { rows } = await pool.query(query);
  return rows;
};

const getStockProducto = async (id_producto, id_peluqueria) => {
  const query = `
    SELECT cant 
    FROM "producto-peluqueria"
    WHERE id_producto = $1 AND id_peluqueria = $2
  `;
  const values = [id_producto, id_peluqueria];
  
  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Esto devolverá el objeto con la propiedad `cant` correspondiente
  } catch (error) {
    console.error('Error al obtener el stock del producto:', error);
    throw error;
  }
};

const getProductoById = async (id) => {
  const query = 'SELECT * FROM producto WHERE id_producto = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const createProducto = async (nombre, valor) => {
  // Obtener el último id_producto
  const maxIdQuery = 'SELECT MAX(id_producto) as max_id FROM producto';
  const maxIdResult = await pool.query(maxIdQuery);
  const maxId = maxIdResult.rows[0].max_id;
  const newIdProducto = maxId ? maxId + 1 : 1;
  console.log('Nuevo id_producto:', newIdProducto);

  // Insertar el nuevo producto con el nuevo id
  const insertQuery = 'INSERT INTO producto (id_producto, nombre, valor) VALUES ($1, $2, $3) RETURNING *';
  const values = [newIdProducto, nombre, valor];
  const { rows } = await pool.query(insertQuery, values);
  return rows[0];
};

const updateProducto = async (id, nombre, valor) => {
  const query = 'UPDATE producto SET nombre = $2, valor = $3 WHERE id_producto = $1 RETURNING *';
  const values = [id, nombre, valor];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateStockProducto = async (cantidad, id_producto, id_peluqueria) => {
  const query = `
    UPDATE "producto-peluqueria"
    set cant = $1
    WHERE id_producto = $2 AND id_peluqueria = $3
    `;
  const values = [cantidad, id_producto, id_peluqueria];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const addProductosToAllPeluquerias = async (idProducto) => {
  console.log('idProducto:', idProducto);
  const query = `
    INSERT INTO "producto-peluqueria" (id_peluqueria, id_producto, cant)
    SELECT id_peluqueria, $1, 0
    FROM peluqueria
    WHERE id_peluqueria NOT IN (
      SELECT id_peluqueria
      FROM "producto-peluqueria"
      WHERE id_producto = $1
    );
  `;
  const values = [idProducto];
  
  try {
    const { rowCount } = await pool.query(query, values);
    return rowCount;
  } catch (error) {
    console.error('Error al agregar producto a todas las peluquerías:', error);
    throw error;
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  updateStockProducto,
  addProductosToAllPeluquerias,
  getStockProducto
};
