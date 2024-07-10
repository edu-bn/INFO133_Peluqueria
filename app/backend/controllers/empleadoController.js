const Empleado = require('../models/Empleado');

const getEmpleados = async (req, res) => {
    try {
        const empleado = await Empleado.getAllEmpleados();
        res.json(empleado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getEmpleado = async (req, res) => {
    try {
        const { rut_empleado } = req.params;
        const empleado = await Empleado.getEmpleadoByRut(rut_empleado);
        res.json(empleado);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getServiciosDelEmpleado = async (req, res) => {
    const { rut_empleado } = req.params;
    try {
        const servicios = await Empleado.getAllEmpleadosServicios(rut_empleado);
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const agregarNuevoEmpleado = async (req, res) => {
    const { rut_empleado, nombre, apellido, telefono, id_comuna } = req.body;
    console.log('Añadir nuevo empleado:', rut_empleado, nombre, apellido, telefono, id_comuna);

    try {
        const nuevoEmpleado = await Empleado.addNewEmpleado(rut_empleado, nombre, apellido, telefono, id_comuna);

        res.status(201).json({ message: `Empleado añadido correctamente con rut: ${nuevoEmpleado}.` });
    } catch (error) {
        console.error('Error al añadir nuevo empleado:', error);
        res.status(500).json({ error: 'Error interno al añadir nuevo empleado.' });
    }
};


    
const actualizarServiciosEmpleado = async (req, res) => {
    const { rut_empleado, servicios, isPeluquero, isManicurista } = req.body;
    console.log('Actualizar servicios del empleado:', rut_empleado, servicios, isPeluquero, isManicurista);

    try {
        // Llamar a la función para actualizar servicios
        await Empleado.updateServicios(rut_empleado, servicios, isPeluquero, isManicurista);

        // Respuesta exitosa
        res.status(200).json({ message: 'Servicios actualizados correctamente.' });
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar servicios del empleado:', error);
        res.status(500).json({ error: 'Error interno al actualizar servicios del empleado.' });
    }
};

const actualizarFechaFinEmpleado = async (req, res) => {
    const { rut_empleado } = req.params;
    const { fecha_fin } = req.body;
  
    try {
      await Empleado.updateFechaFinEmpleado(rut_empleado, fecha_fin);
      res.status(200).json({ message: `Fecha de fin actualizada para el empleado con rut ${rut_empleado}` });
    } catch (error) {
      console.error('Error al actualizar la fecha de fin del empleado:', error);
      res.status(500).json({ error: 'Error al actualizar la fecha de fin del empleado' });
    }
  };



module.exports = {
    getEmpleados,
    getServiciosDelEmpleado,
    actualizarServiciosEmpleado,
    agregarNuevoEmpleado,
    getEmpleado,
    actualizarFechaFinEmpleado
};