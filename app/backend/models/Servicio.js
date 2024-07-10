const pool = require('../config/db.config');

const getAllServicios = async () => {
    const query = 'SELECT * FROM servicio';
    const { rows } = await pool.query(query);
    return rows;
}

const getServiciosByProfesional = async (idProfesional) => {
    const query = `
        SELECT s.*
        FROM servicio s
        JOIN profesion_servicio ps ON s.id_servicio = ps.id_servicio
        JOIN profesion p ON ps.id_profesion = p.id_profesion
        WHERE p.rut_empleado = $1;
    `;
    const { rows } = await pool.query(query, [idProfesional]);
    return rows;
}

module.exports = {
    getAllServicios,
    getServiciosByProfesional
};