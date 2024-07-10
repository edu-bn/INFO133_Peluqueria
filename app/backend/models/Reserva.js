const pool = require('../config/db.config');

const getHorasDisponibles = async (idProfesional, fecha) => {
    const query = `
        WITH HorasDisponibles AS (
            SELECT generate_series(
                TIMESTAMP $1,
                TIMESTAMP $1 + INTERVAL '1 day' - INTERVAL '1 second',
                INTERVAL '30 minutes'
            ) AS hora_disponible
        ),
        HorasOcupadas AS (
            SELECT TO_TIMESTAMP(SUBSTRING(horaprofesion FROM 1 FOR 19), 'DD-MM-YYYY HH24:MI:SS') AS hora_ocupada
            FROM cita
            WHERE id_profesion = $2
            AND fecha::date = $3::date
        )
        SELECT hora_disponible
        FROM HorasDisponibles
        WHERE EXTRACT(HOUR FROM hora_disponible) >= 8 -- Ejemplo: Horario de trabajo comienza a las 8 AM
        AND EXTRACT(HOUR FROM hora_disponible) < 18 -- Ejemplo: Horario de trabajo termina a las 6 PM
        AND NOT EXISTS (
            SELECT 1
            FROM HorasOcupadas
            WHERE HorasOcupadas.hora_ocupada = HorasDisponibles.hora_disponible
        )
        ORDER BY hora_disponible;
    `;
    const { rows } = await pool.query(query, [fecha, idProfesional, fecha]);
    return rows;
}

module.exports = {
    getHorasDisponibles,
};
