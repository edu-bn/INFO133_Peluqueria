import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';

import Top from '../../Top.jsx';
import Buscador from './Buscador.jsx';
import TablaProductos from './TablaProductos.jsx';

import axios from 'axios';

const AdminProductos = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { local } = location.state || {};
  const showAlert = !location.state;

  const handleReturnHome = () => {
    navigateTo("/");
  };

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Nombre');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

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

  const handleSave = async (producto) => {
    try {
      await axios.put(`http://localhost:3000/api/productos/${producto.id_producto}`, producto);
      setProductos((prevProductos) =>
        prevProductos.map((p) => (p.id_producto === producto.id_producto ? producto : p))
      );
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  return (
    <div>
      <Top text={'Gestion de Productos'} />
      {showAlert ? (
        <Alert status="error" variant="subtle" mt={4}>
          <AlertIcon />
          <AlertTitle>Por favor selecciona un local antes de continuar.</AlertTitle>
          <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
            Volver a la página principal
          </Button>
        </Alert>
      ) : (
        <div>
          <Buscador onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
          <TablaProductos productos={productosFiltrados} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
