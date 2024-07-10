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

module.exports = {
    getAllProfesionalByPeluqueria,
};
