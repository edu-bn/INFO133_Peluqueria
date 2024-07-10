const BoletaVenta = require('../models/Boleta_venta');
const Detalle = require('../models/Detalle');


const crearBoletaVenta = async (req, res) => {
    const { fecha, rut_cliente, monto, id_peluqueria } = req.body;
    try{
        const nuevaBoletaVenta = await BoletaVenta.createBoletaVenta(fecha,rut_cliente,monto, id_peluqueria);
        res.json(nuevaBoletaVenta)
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    crearBoletaVenta
}