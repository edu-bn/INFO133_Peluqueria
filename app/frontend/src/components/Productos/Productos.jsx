import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';

import Top from '../Top.jsx';
import Buscador from './Buscador.jsx';
import TablaProductos from './TablaProductos.jsx';
import BuyButton from './BuyButton.jsx';
import VentanaVenta from './VentanaVenta.jsx';

import axios from 'axios';

const Productos = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { local } = location.state || {};
  const { rut } = location.state || {};
  let showAlert = false;
  if (!local && !rut) {
    showAlert = true;
  }
  

  const handleReturnHome = () => {
    navigateTo("/");
  };

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Nombre');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fechaHoy, setFechaHoy] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    const obtenerFechaHoy = () =>{
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setFechaHoy(formattedDate);
    };
    obtenerFechaHoy();
  },[]);

  useEffect(() => {
    // Este efecto se encargará de actualizar la lista de productos cuando el componente se monte
    const getProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/peluquerias/productos/${local.id_peluqueria}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    getProductos();
  }, [local]);

  const handleFilterChange = useCallback((filtro) => {
    setFiltro(filtro);
  }, []);

  const handleSearchChange = useCallback((terminoBusqueda) => {
    setTerminoBusqueda(terminoBusqueda);
  }, []);

  const handleButtonClick = (producto, cantidad) => {
    setProductosSeleccionados((prevSelectedProducts) => {
      const existente = prevSelectedProducts.find((p) => p.id === producto.id_producto);
      let nuevosProductos;
      if (existente) {
        nuevosProductos = prevSelectedProducts.map((p) =>
          p.id === producto.id_producto ? { ...p, cantidad } : p
        );
      } else {
        nuevosProductos = [...prevSelectedProducts, { id: producto.id_producto, cantidad }];
      }
      return nuevosProductos;
    });
  };

  const calcularValorTotal = (productosSeleccionados) => {
    let total = 0;
    productosSeleccionados.forEach((productoSeleccionado) => {
      const producto = productos.find((p) => p.id_producto === productoSeleccionado.id);
      if (producto) {
        total += producto.valor * productoSeleccionado.cantidad;
      }
    });
    return total;
  };


  const handleCreateNewBoleta = async () => {
    try {
      const nuevaBoleta = {
        fecha: fechaHoy,
        rut_cliente: rut,
        monto: calcularValorTotal(productosSeleccionados),
        id_peluqueria: local.id_peluqueria,
      };  
      // Crear la boleta de venta
      const response = await axios.post('http://localhost:3000/api/boleta_venta', nuevaBoleta);
      const id_boleta_venta = response.data.id_boleta_venta; // Obtener el id_boleta_venta generado en la respuesta
  
      // Crear los detalles para cada producto seleccionado
      for (const producto of productosSeleccionados) {
        const nuevoDetalle = {
          cantidad: producto.cantidad,
          id_producto: producto.id,
          id_boleta_venta: id_boleta_venta,
        };
        // Enviar cada detalle al backend
        await axios.post('http://localhost:3000/api/detalle', nuevoDetalle);

        const response = await axios.get(`http://localhost:3000/api/productos/${producto.id}/${local.id_peluqueria}`);
        const cantidadTotal = (response.data.cant);
                
        const cantidadActual = Number(cantidadTotal) - Number(producto.cantidad);
        await axios.put(`http://localhost:3000/api/productos/${producto.id}/peluquerias/${local.id_peluqueria}`, { cantidad: Number(cantidadActual) });
      }
      
      const updatedProductosResponse = await axios.get(`http://localhost:3000/api/peluquerias/productos/${local.id_peluqueria}`);
      setProductos(updatedProductosResponse.data);

      console.log('Boleta creada con detalles:', response.data);
    } catch (error) {
      console.error('Error al crear la boleta:', error);
    }
  };
  

  const productosFiltrados = useMemo(() => {
    if (!terminoBusqueda) {
      return productos;
    }

    return productos.filter((producto) =>
      filtro === 'ID'
        ? producto.id_producto.toString().includes(terminoBusqueda)
        : producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }, [productos, filtro, terminoBusqueda]);

  const handleBuyButtonClick = () => {
    handleCreateNewBoleta();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Top text={'Productos'}></Top>
      {showAlert ? (    
      <Alert status="error" variant="subtle" mt={4}>
      <AlertIcon />
      <AlertTitle>
        Por favor selecciona un local e ingrese el cliente antes de continuar.
      </AlertTitle>
      <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
        Volver a la página principal
      </Button>
    </Alert>
    ) : (<div>
      <Buscador onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
      <BuyButton onClick={handleBuyButtonClick} 
            size="xl"
            boxSize="60px"
            fontSize="24px"> 
      </BuyButton>
      <VentanaVenta isOpen={isModalOpen} onClose={handleCloseModal}/>
      <TablaProductos productos={productosFiltrados} onAddButtonClick={handleButtonClick} />
    </div>
    )}
    </div>
  );
};

export default Productos;
