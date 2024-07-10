const pool = require('../config/db.config');

const getAllEmpleados = async () => {
    const query = 'SELECT * FROM empleado';
    const { rows } = await pool.query(query);
    return rows;
}

const getEmpleadoByRut = async (rut_empleado) => {
    const query = 'SELECT * FROM empleado WHERE rut_empleado = $1';
    const { rows } = await pool.query(query, [rut_empleado]);
    return rows[0];
}

const getAllEmpleadosServicios = async (rut_empleado) => {
    const query = `
        SELECT s.id_servicio, s.nombre AS nombre_servicio, s.costo, s.duracion, s.especialidad
        FROM empleado e
        LEFT JOIN profesion p ON e.rut_empleado = p.rut_empleado
        LEFT JOIN "profesion-servicio" ps ON p.id_profesion = ps.id_profesion
        LEFT JOIN servicio s ON ps.id_servicio = s.id_servicio
        WHERE e.rut_empleado = $1
        `;
    const { rows } = await pool.query(query, [rut_empleado]);
    return rows;
}

// Función para añadir un nuevo empleado
const addNewEmpleado = async (rut_empleado, nombre, apellido, telefono, id_comuna) => {
    try {
        const insertQuery = `
            INSERT INTO empleado (rut_empleado, nombre, apellido, telefono, id_comuna)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING rut_empleado
        `;
        const insertValues = [rut_empleado, nombre, apellido, telefono, id_comuna];
        const { rows } = await pool.query(insertQuery, insertValues);
        console.log(`Se ha añadido un nuevo empleado con rut: ${rows[0].rut_empleado}`);
        return rows[0].rut_empleado;
    } catch (error) {
        console.error('Error al añadir nuevo empleado:', error);
        throw error;
    }
};


const updateServicios = async (rut_empleado, servicios, isPeluquero, isManicurista) => {
    try {
        // Verificar si existe un registro en profesion con el rut_empleado dado
        const existQuery = 'SELECT * FROM profesion WHERE rut_empleado = $1';
        const existValues = [rut_empleado];
        const { rows } = await pool.query(existQuery, existValues);

        let id_profesion;

        if (rows.length === 0) {
            // Obtener la última id_profesion para generar la siguiente
            const getLastIdQuery = 'SELECT MAX(id_profesion) AS max_id FROM profesion';
            const { rows: maxIdRow } = await pool.query(getLastIdQuery);

            let nextId = 1; // Valor por defecto si no hay registros en la tabla

            if (maxIdRow.length > 0 && maxIdRow[0].max_id !== null) {
                nextId = maxIdRow[0].max_id + 1;
            }

            // Insertar un nuevo registro en profesion
            const insertQuery = 'INSERT INTO profesion (id_profesion, rut_empleado, peluquero, manicurista) VALUES ($1, $2, $3, $4) RETURNING id_profesion';
            const insertValues = [nextId, rut_empleado, isPeluquero, isManicurista];
            const { rows: insertRows } = await pool.query(insertQuery, insertValues);
            id_profesion = insertRows[0].id_profesion;

            console.log(`Se ha insertado un nuevo registro en profesion para rut_empleado: ${rut_empleado}`);
        } else {
            id_profesion = rows[0].id_profesion;
        }

        if (isPeluquero === true || isManicurista === true) {
            // Actualizar la tabla profesion-servicio para el id_profesion obtenido
            const deleteQuery = 'DELETE FROM "profesion-servicio" WHERE id_profesion = $1';
            await pool.query(deleteQuery, [id_profesion]);

            const insertPSQuery = 'INSERT INTO "profesion-servicio" (id_servicio, id_profesion) VALUES ($1, $2)';
            const insertPSValues = servicios.map(servicio_id => [servicio_id, id_profesion]);
            await Promise.all(
                insertPSValues.map(values => pool.query(insertPSQuery, values))
            );

            console.log(`Se han actualizado los servicios para el empleado con rut: ${rut_empleado}`);
        } else {
             // Eliminar todos los servicios relacionados con este empleado y desmarcar peluquero y manicurista
             const deletePSQuery = 'DELETE FROM "profesion-servicio" WHERE id_profesion = $1';
             await pool.query(deletePSQuery, [id_profesion]);
 
             const updateProfesionQuery = 'UPDATE profesion SET peluquero = false, manicurista = false WHERE id_profesion = $1';
             await pool.query(updateProfesionQuery, [id_profesion]);
 
             console.log(`Se han eliminado todos los servicios y desmarcado peluquero/manicurista para el empleado con rut: ${rut_empleado}`);
        }

    } catch (error) {
        console.error('Error al verificar/existir o insertar en profesion:', error);
        throw error;
    }
};

const updateFechaFinEmpleado = async (rut_empleado, fecha_fin) => {
    try {
        const updateQuery = `
            UPDATE "empleado-peluqueria"
            SET fecha_fin = $1
            WHERE rut_empleado = $2
        `;
        const { rowCount } = await pool.query(updateQuery, [fecha_fin, rut_empleado]);

        if (rowCount > 0) {
            console.log(`Se actualizó la fecha de fin para el empleado con rut: ${rut_empleado}`);
        } else {
            console.log(`No se encontró ningún registro en "empleado-peluqueria" para rut: ${rut_empleado}`);
        }
    } catch (error) {
        console.error('Error al actualizar la fecha de fin del empleado:', error);
        throw error;
    }
};





module.exports = {
    getAllEmpleados,
    getAllEmpleadosServicios,
    updateServicios,
    addNewEmpleado,
    getEmpleadoByRut,
    updateFechaFinEmpleado
};