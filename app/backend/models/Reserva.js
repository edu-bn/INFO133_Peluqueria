const { query } = require('express');
const pool = require('../config/db.config');

const getHorasDisponibles = async (idProfesional, fecha) => {
    console.log('fecha en el model', fecha);
    console.log('idProfesional en el model', idProfesional);
    const query = `
        WITH HorasDisponibles AS (
            SELECT generate_series(
                TIMESTAMP '${fecha}',
                TIMESTAMP '${fecha}' + INTERVAL '1 day' - INTERVAL '1 second',
                INTERVAL '30 minutes'
            ) AS hora_disponible
        ),
        HorasOcupadas AS (
            SELECT TO_TIMESTAMP(SUBSTRING(horaprofesion FROM 1 FOR 19), 'DD-MM-YYYY HH24:MI:SS') AS hora_ocupada
            FROM cita
            WHERE id_profesion = ${idProfesional}
            AND fecha::date = '${fecha}'::date
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
    const { rows } = await pool.query(query);
    return rows;
};

const crearBoleta_cita = async (monto, rut_cliente, id_peluqueria) => {

    // Obtener el ultimo id de boleta_cita
    const maxIdQuery = 'SELECT MAX(id_boleta_cita) as max_id FROM boleta_cita';
    const maxIdResult = await pool.query(maxIdQuery);
    const maxId = maxIdResult.rows[0].max_id;
    const newIdProducto = maxId ? maxId + 1 : 1;
    console.log('Nuevo id_producto:', newIdProducto);

    const query = `
        INSERT INTO boleta_cita (id_boleta_cita, monto, rut_cliente, id_peluqueria)
        VALUES ($1, $2, $3, $4)
        RETURNING *;

    `;
    const values = [newIdProducto, monto, rut_cliente, id_peluqueria];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const crearCita = async (fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion) => {
    const horaprofesion = `${fecha}:${id_profesion}`;

    // Obtener el ultimo id de cita
    const maxIdQuery = 'SELECT MAX(id_cita) as max_id FROM cita';
    const maxIdResult = await pool.query(maxIdQuery);
    const maxId = maxIdResult.rows[0].max_id;
    const newIdCita = maxId ? maxId + 1 : 1;
    console.log('Nuevo id_cita:', newIdCita);

    const query = `
        INSERT INTO cita (id_cita, fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion, horaprofesion)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [newIdCita, fecha, rut_cliente, id_boleta_cita, id_servicio, id_profesion, horaprofesion];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    getHorasDisponibles,
    crearBoleta_cita,
    crearCita
};
