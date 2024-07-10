const pool = require('../config/db.config');

const createBoletaVenta = async (fecha, rut_cliente, monto, id_peluqueria) => {
  try {
    // Obtener el último id_boleta_venta
    const maxIdQuery = 'SELECT MAX(id_boleta_venta) as max_id FROM boleta_venta';
    const maxIdResult = await pool.query(maxIdQuery);
    const maxId = maxIdResult.rows[0].max_id;
    const newIdBoletaVenta = maxId ? maxId + 1 : 1;
    console.log('Nuevo id_boleta_venta: ', newIdBoletaVenta);

    // Insertar nueva boleta_venta
    const insertQuery = 'INSERT INTO boleta_venta (id_boleta_venta, fecha, rut_cliente, monto, id_peluqueria) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [newIdBoletaVenta, fecha, rut_cliente, monto, id_peluqueria];
    const { rows } = await pool.query(insertQuery, values);
    
    return rows[0];
  } catch (error) {
    console.error('Error al agregar boleta de venta:', error);
    throw error;
  }
}

module.exports = {
  createBoletaVenta
};
