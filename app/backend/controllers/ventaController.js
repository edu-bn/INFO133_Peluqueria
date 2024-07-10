// controllers/ventaController.js
const Detalle = require('../models/Detalle');

const crearBoletaVenta = async (req, res) => {
  const { fecha, rut_cliente, monto } = req.body;
  console.log('estoy en ventaController')
  
  try {
    // Crear la boleta_venta
    const boleta = await BoletaVenta.addBoletaVenta(fecha, rut_cliente, monto);
    const id_boleta_venta = boleta.id_boleta_venta;
    
    // Crear los detalles
    for (let detalle of detalles) {
      await Detalle.create({
        cantidad: detalle.cantidad,
        id_producto: detalle.id_producto,
        id_boleta_venta: id_boleta_venta,
        id_peluqueria: detalle.id_peluqueria
      });
    }

    res.status(201).json({ message: 'Venta creada exitosamente', id_boleta_venta });
  } catch (error) {
    console.error('Error creando la venta:', error);
    res.status(500).json({ error: 'Error creando la venta' });
  }
};

module.exports = { crearVenta };
