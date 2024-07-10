const pool = require('../config/db.config');

const getAllServicios = async () => {
    const query = 'SELECT * FROM servicio';
    const { rows } = await pool.query(query);
    return rows;
}

const getServiciosByProfesional = async (id_profesion) => {
    const query = `
    SELECT s.*
    FROM "profesion-servicio" ps
    JOIN servicio s ON ps.id_servicio = s.id_servicio
    WHERE ps.id_profesion = $1;
    `;
    const { rows } = await pool.query(query, [id_profesion]);
    return rows;
};

module.exports = {
    getAllServicios,
    getServiciosByProfesional
};