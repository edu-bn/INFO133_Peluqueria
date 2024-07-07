const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { route } = require('./peluqueria');

router.get('/', clienteController.getClientes);
router.get('/:rut', clienteController.getCliente);

module.exports = router;