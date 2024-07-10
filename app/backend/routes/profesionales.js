const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/peluqueria/:id_peluqueria/', profesionalController.getAllProfesionales); //todos los profesionales por peluqueria

module.exports = router;
