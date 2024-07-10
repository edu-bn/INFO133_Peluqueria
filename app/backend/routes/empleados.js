const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas para comunas
router.get('/', empleadoController.getEmpleados);
router.get('/:rut_empleado', empleadoController.getEmpleado);
router.get('/:rut_empleado/servicios', empleadoController.getServiciosDelEmpleado); //servicios de un empleado
router.post('/actualizar-servicios', empleadoController.actualizarServiciosEmpleado);
router.post('/agregar-empleado', empleadoController.agregarNuevoEmpleado);
router.put('/:rut_empleado/fecha-fin', empleadoController.actualizarFechaFinEmpleado);




module.exports = router;