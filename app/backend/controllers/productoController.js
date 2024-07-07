const Producto = require('../models/Producto');

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.getAllProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.getProductoById(id);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crearProducto = async (req, res) => {
  const { nombre, valor } = req.body;
  try {
    const nuevoProducto = await Producto.createProducto(nombre, valor);
    res.json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, valor } = req.body;
  try {
    const productoActualizado = await Producto.updateProducto(id, nombre, valor);
    res.json(productoActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarStockProducto = async (req, res) => {
  const { id_producto, id_peluqueria } = req.params;
  const { cantidad } = req.body;

  try {
    const productoActualizado = await Producto.updateStockProducto(cantidad, id_producto, id_peluqueria);
    res.json(productoActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  actualizarStockProducto,
};
