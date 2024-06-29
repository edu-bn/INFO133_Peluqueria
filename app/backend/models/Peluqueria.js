const pool = require('../config/db.config');

const getAllPeluquerias = async () => {
    const query = 'SELECT * FROM peluqueria';
    const { rows } = await pool.query
    (query);
    return rows;
}

const getPeluqueriaById = async (id) => {
    const query = 'SELECT * FROM peluqueria WHERE id_peluqueria = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0]; //rows[0] ya que las peluquerias son unicas
}

const getPeluqueriaByComuna = async (id) => {
    const query = 'SELECT * FROM peluqueria WHERE id_comuna = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows;
}

const getPeluqueriaByRegion = async (id) => {
    const query = 'SELECT * FROM peluqueria p WHERE id_comuna IN (SELECT id_comuna FROM comuna WHERE id_region = $1)';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows;
}

module.exports = {
    getAllPeluquerias,
    getPeluqueriaById,
    getPeluqueriaByComuna,
    getPeluqueriaByRegion
};