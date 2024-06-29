const express = require('express');
const router = express.Router();
const comunaController = require('../controllers/comunaController');

// Rutas para comunas
router.get('/', comunaController.getComunas);
router.get('/:id', comunaController.getComuna);
router.get('/region/:id', comunaController.getComunaByRegion);

module.exports = router;