const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para productos
router.get('/', productoController.getProductos);
router.get('/:id', productoController.getProducto);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.actualizarProducto);

// Rutas para stock de productos
router.put('/:id_producto/peluquerias/:id_peluqueria', productoController.actualizarStockProducto);


module.exports = router;
