// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos');
const regionesRoutes = require('./routes/regiones');
const comunasRoutes = require('./routes/comunas');
const peluqueriaRoutes = require('./routes/peluqueria');
const clienteRoutes = require('./routes/clientes');
<<<<<<< HEAD
const detalleRoutes = require('./routes/detalle');
const boletaVentaRoutes = require('./routes/boletaVenta'); 

=======
const empleadoRoutes = require('./routes/empleados');
const servicioRoutes = require('./routes/servicios');
const profesionalRoutes = require('./routes/profesionales');
const reservaRoutes = require('./routes/reservas');
>>>>>>> bb76305d50c423e7330f80c9385025cffef6eae9

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
app.use('/api/clientes', clienteRoutes);
<<<<<<< HEAD
app.use('/api/boleta_venta', boletaVentaRoutes); 
app.use('/api/detalle', detalleRoutes);
=======
app.use('/api/empleados', empleadoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/reservas', reservaRoutes);
>>>>>>> bb76305d50c423e7330f80c9385025cffef6eae9


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
