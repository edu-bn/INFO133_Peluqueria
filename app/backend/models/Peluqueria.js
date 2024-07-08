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

const getProductosByPeluqueria = async (idPeluqueria) => {
    const query = `
        SELECT
            pr.id_producto,
            pr.nombre,
            pr.valor,
            pp.cant
        FROM peluqueria p
        JOIN "producto-peluqueria" pp ON p.id_peluqueria = pp.id_peluqueria
        JOIN producto pr ON pp.id_producto = pr.id_producto
        WHERE p.id_peluqueria = $1
        ORDER BY pr.id_producto
    `;
    const values = [idPeluqueria];
    const { rows } = await pool.query(query, values);
    return rows;
}

module.exports = {
    getAllPeluquerias,
    getPeluqueriaById,
    getPeluqueriaByComuna,
    getPeluqueriaByRegion,
    getProductosByPeluqueria
};