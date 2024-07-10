const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// Rutas para servicios
router.get('/', servicioController.getServicios);
router.get('/profesional/:id_profesion', servicioController.getServiciosByProfesional); //servicios de un profesional



module.exports = router;