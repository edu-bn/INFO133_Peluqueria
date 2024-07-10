const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/peluqueria/:id_peluqueria/', profesionalController.getAllProfesionales); //todos los profesionales por peluqueria
router.get('/servicio/:id_servicio/peluqueria/:id_peluqueria', profesionalController.getEmpleadosByServicioAndPeluqueria); //profesional por servicio y peluqueria

module.exports = router;
