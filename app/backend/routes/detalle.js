const express = require('express');
const router = express.Router();

const detalleController = require('../controllers/detalleController');

router.post('/', detalleController.crearDetalle);

module.exports = router;
