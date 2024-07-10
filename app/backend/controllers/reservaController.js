const Reserva = require('../models/Reserva');

const getHorasDisponiblesPorProfesional = async (req, res) => {
    try {
        const { idProfesional, fecha } = req.params;
        console.log('idProfesional', idProfesional);
        console.log('fecha', fecha);
        const horasDisponibles = await Reserva.getHorasDisponibles(idProfesional, fecha);
        res.status(200).json(horasDisponibles);
    } catch (error) {
        console.error('Error fetching available hours:', error);
        res.status(500).json({ error: 'Error fetching available hours' });
    }
}

const crearBoleta_cita = async (req, res) => {
    try {
        const { monto, rut_cliente, id_peluqueria } = req.body;
        const boleta_cita = await Reserva.crearBoleta_cita(monto, rut_cliente, id_peluqueria);
        res.status(201).json(boleta_cita);
    } catch (error) {
        console.error('Error creating boleta_cita:', error);
        res.status(500).json({ error: 'Error creating boleta_cita' });
    }
}

const crearCita = async (req, res) => {
    try {
        const { fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion } = req.body;
        const cita = await Reserva.crearCita(fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion);
        res.status(201).json(cita);
    } catch (error) {
        console.error('Error creating cita:', error);
        res.status(500).json({ error: 'Error creating cita' });
    }
}

module.exports = {
    getHorasDisponiblesPorProfesional,
    crearBoleta_cita,
    crearCita
};
