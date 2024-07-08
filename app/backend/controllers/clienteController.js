const Cliente = require('../models/Clientes');
const { get } = require('../routes/peluqueria');

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAllClientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCliente = async (req, res) => {
    const { rut } = req.params;
    try {
      const cliente = await Cliente.getClienteByRut(rut); // Llamamos a la función getClienteByRut que ya tienes definida
      if (cliente) {
        res.json(cliente); // Devuelve el cliente encontrado
      } else {
        res.json({}); // Devuelve un objeto vacío si el cliente no existe
      }
    } catch (err) {
      res.status(500).json({ error: err.message }); // Manejo de errores si ocurre algún problema en la consulta
    }
  };

  const createCliente = async (req, res) => {
    const cliente = req.body;
    try {
      const newCliente = await Cliente.addCliente(cliente.rut_cliente, cliente.nombre, cliente.apellido, cliente.telefono, cliente.id_comuna);
      res.status(201).json(newCliente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

module.exports = {
    getClientes,
    getCliente,
    createCliente
};