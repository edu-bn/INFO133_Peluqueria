const Comuna = require('../models/Comuna');

const getComunas = async (req, res) => {
    try {
        const comunas = await Comuna.getAllComunas();
        res.json(comunas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getComuna = async (req, res) => {
    const { id } = req.params;
    try {
        const comuna = await Comuna.getComunaById(id);
        res.json(comuna);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getComunaByRegion = async (req, res) => {
    const { id } = req.params;
    try {
        const comunas = await Comuna.getComunaByRegion(id);
        res.json(comunas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getComunas,
    getComuna,
    getComunaByRegion
};