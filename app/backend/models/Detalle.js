const pool = require('../config/db.config');

const createDetalle = async(cantidad, id_producto, id_boleta_venta) =>{
    console.log('models');
    const query = 'INSERT INTO detalle (cantidad, id_producto, id_boleta_venta) VALUES ($1, $2, $3) RETURNING *';
    const values = [cantidad, id_producto, id_boleta_venta];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports={
    createDetalle
}