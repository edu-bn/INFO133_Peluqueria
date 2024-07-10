const Servicio = require('../models/Servicio');

const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAllServicios();
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = {
    getServicios
};