const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/profesional/:idProfesional/fecha/:fecha/horas-disponibles', reservaController.getHorasDisponiblesPorProfesional);
router.post('/crear-boleta-cita/:monto/:rut_cliente/:id_peluqueria', reservaController.crearBoleta_cita);
router.post('/crear-cita/:fecha/:rut_cliente/:id_boleta_cita/:id_servicio/:id_profesion', reservaController.crearCita);

module.exports = router;
