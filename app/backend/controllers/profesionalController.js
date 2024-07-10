const Profesional = require('../models/Profesional');

const getAllProfesionales = async (req, res) => {
    try {

        const id_peluqueria = req.params.id_peluqueria;
        console.log('id_peluqueria', id_peluqueria);
        const profesionales = await Profesional.getAllProfesionalByPeluqueria(id_peluqueria);
        res.status(200).json(profesionales);
    } catch (error) {
        console.error('Error fetching professionals:', error);
        res.status(500).json({ error: 'Error fetching professionals' });
    }
}

const getEmpleadosByServicioAndPeluqueria = async (req, res) => {
    try {
        const id_servicio = req.params.id_servicio;
        const id_peluqueria = req.params.id_peluqueria;
        const empleados = await Profesional.getEmpleadosByServicioAndPeluqueria(id_servicio, id_peluqueria);
        res.status(200).json(empleados);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
}

module.exports = {
    getAllProfesionales,
    getEmpleadosByServicioAndPeluqueria
};