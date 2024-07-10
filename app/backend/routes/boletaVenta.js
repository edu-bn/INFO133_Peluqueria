const express = require('express');
const router = express.Router();
const boletaVentaController = require('../controllers/boleta_ventaController');

router.post('/', boletaVentaController.crearBoletaVenta);

module.exports = router;