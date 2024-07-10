const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/profesional/:idProfesional/fecha/:fecha/horas-disponibles', reservaController.getHorasDisponiblesPorProfesional);

module.exports = router;
