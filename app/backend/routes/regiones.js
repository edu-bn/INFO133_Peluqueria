const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

// Rutas para regiones
router.get('/', regionController.getRegiones);
router.get('/:id', regionController.getRegion);

module.exports = router;
