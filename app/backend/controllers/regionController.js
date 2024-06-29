const Region = require('../models/Region');

const getRegiones = async (req, res) => {
    try {
        const regiones = await Region.getAllRegiones();
        res.json(regiones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRegion = async (req, res) => {
    const { id } = req.params;
    try {
        const region = await Region.getRegionById(id);
        res.json(region);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getRegiones,
    getRegion
};
