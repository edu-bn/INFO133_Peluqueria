const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/profesional/:idProfesional/fecha/:fecha/horas-disponibles', reservaController.getHorasDisponiblesPorProfesional);
router.post('/crear-boleta-cita/:monto/:rut_cliente/:id_peluqueria', reservaController.crearBoleta_cita);
router.post('/crear-boleta-cita', reservaController.crearBoleta_cita);
router.post('/crear-cita', reservaController.crearCita);


module.exports = router;
