Peluqueria = require('../models/Peluqueria');

const getPeluquerias = async (req, res) => {
    try {
        const peluquerias = await Peluqueria.getAllPeluquerias();
        res.json(peluquerias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPeluqueria = async (req, res) => {
    const { id } = req.params;
    try {
        const peluqueria = await Peluqueria.getPeluqueriaById(id);
        res.json(peluqueria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPeluqueriaByComuna = async (req, res) => {
    const { id } = req.params;
    try {
        const peluquerias = await Peluqueria.getPeluqueriaByComuna(id);
        res.json(peluquerias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPeluqueriaByRegion = async (req, res) => {
    const { id } = req.params;
    try {
        const peluquerias = await Peluqueria.getPeluqueriaByRegion(id);
        res.json(peluquerias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getProductosByPeluqueria = async (req, res) => {
    const { id } = req.params;
    try {
        const productos = await Peluqueria.getProductosByPeluqueria(id);
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getPeluquerias,
    getPeluqueria,
    getPeluqueriaByComuna,
    getPeluqueriaByRegion,
    getProductosByPeluqueria
};