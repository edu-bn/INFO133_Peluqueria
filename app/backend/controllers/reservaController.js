const Reserva = require('../models/Reserva');

const getHorasDisponiblesPorProfesional = async (req, res) => {
    try {
        const { idProfesional, fecha } = req.params;
        const horasDisponibles = await Reserva.getHorasDisponibles(idProfesional, fecha);
        res.status(200).json(horasDisponibles);
    } catch (error) {
        console.error('Error fetching available hours:', error);
        res.status(500).json({ error: 'Error fetching available hours' });
    }
}

module.exports = {
    getHorasDisponiblesPorProfesional,
};
