const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getClientes);
router.get('/:rut', clienteController.getCliente);
router.post('/', clienteController.createCliente);

module.exports = router;