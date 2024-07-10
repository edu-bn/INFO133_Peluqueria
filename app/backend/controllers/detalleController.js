const Detalle = require('../models/Detalle');

const crearDetalle = async (req, res) => {
    const { cantidad, id_producto, id_boleta_venta } = req.body;
    try {
        const nuevoDetalle = await Detalle.createDetalle(cantidad, id_producto, id_boleta_venta);
        res.json(nuevoDetalle);    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    crearDetalle
};
