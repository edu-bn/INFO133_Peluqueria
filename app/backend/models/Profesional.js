const pool = require('../config/db.config');

const getAllProfesionalByPeluqueria = async (id_peluqueria) => {
    const query = `
    SELECT e.*, p.id_profesion
    FROM empleado e
    JOIN profesion p ON e.rut_empleado = p.rut_empleado
    JOIN "empleado-peluqueria" ep ON e.rut_empleado = ep.rut_empleado
    WHERE ep.id_peluqueria = $1
    AND ep.fecha_fin IS NULL;

    `;
    const { rows } = await pool.query(query, [id_peluqueria]);
    return rows;
}

const getEmpleadosByServicioAndPeluqueria = async (id_servicio, id_peluqueria) => {
    const query = `
        SELECT e.*, p.id_profesion
        FROM empleado e
        JOIN profesion p ON e.rut_empleado = p.rut_empleado
        JOIN "profesion-servicio" ps ON p.id_profesion = ps.id_profesion
        JOIN servicio s ON ps.id_servicio = s.id_servicio
        JOIN "empleado-peluqueria" ep ON e.rut_empleado = ep.rut_empleado
        WHERE s.id_servicio = $1
        AND ep.id_peluqueria = $2
        AND ep.fecha_fin IS NULL;

    `;
    const { rows } = await pool.query(query, [id_servicio, id_peluqueria]);
    return rows;
};

    

module.exports = {
    getAllProfesionalByPeluqueria,
    getEmpleadosByServicioAndPeluqueria
};
