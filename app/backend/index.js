// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos');
const regionesRoutes = require('./routes/regiones');
const comunasRoutes = require('./routes/comunas');
const peluqueriaRoutes = require('./routes/peluqueria');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/regiones', regionesRoutes);
app.use('/api/comunas', comunasRoutes);
app.use('/api/peluquerias', peluqueriaRoutes);
// Puedes agregar más rutas aquí

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});