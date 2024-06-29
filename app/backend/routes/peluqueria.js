const express = require('express');
const router = express.Router();
const peluqueriaController = require('../controllers/peluqueriaController');

// Rutas para peluquerias
router.get('/', peluqueriaController.getPeluquerias);
router.get('/:id', peluqueriaController.getPeluqueria);
router.get('/comuna/:id', peluqueriaController.getPeluqueriaByComuna);
router.get('/region/:id', peluqueriaController.getPeluqueriaByRegion);

module.exports = router;