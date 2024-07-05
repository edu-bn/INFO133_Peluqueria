import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';

import ListaProductos from './ListaProductos.jsx';
import Top from '../Top.jsx';
import Buscador from './Buscador.jsx';
import TablaProductos from './TablaProductos.jsx';
import axios from 'axios';

const Productos = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  //const { local } = location.state || {};
  const showAlert = !location.state;

  const handleReturnHome = () => {
    navigateTo("/");
  };

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('ID');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    // Este efecto se encargará de actualizar la lista de productos cuando el componente se monte
    const getProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    getProductos();
  }, []);

  const handleFilterChange = useCallback((filtro) => {
    setFiltro(filtro);
  }, []);

  const handleSearchChange = useCallback((terminoBusqueda) => {
    setTerminoBusqueda(terminoBusqueda);
  }, []);

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

  const handleButtonClick = (producto) => {
    console.log('Botón añadir clickeado para producto:', producto);
  };

  return (
    <div>
      <Top text={'Productos'}></Top>
      {showAlert ? (    
      <Alert status="error" variant="subtle" mt={4}>
      <AlertIcon />
      <AlertTitle>Por favor selecciona un local antes de continuar.</AlertTitle>
      <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
        Volver a la página principal
      </Button>
    </Alert>
    ) : (<div>
      <Buscador onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
      <TablaProductos productos={productosFiltrados} onAddButtonClick={handleButtonClick} />
      <ListaProductos onProductosLoaded={setProductos} />
    </div>
    )}
    </div>
  );
};

export default Productos;
