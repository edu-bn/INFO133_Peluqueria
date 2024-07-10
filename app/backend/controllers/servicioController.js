const Servicio = require('../models/Servicio');

const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAllServicios();
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getServiciosByProfesional = async (req, res) => {
    const { id_profesion } = req.params;
    try {
        const servicios = await Servicio.getServiciosByProfesional(id_profesion);
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getServicios,
    getServiciosByProfesional
};