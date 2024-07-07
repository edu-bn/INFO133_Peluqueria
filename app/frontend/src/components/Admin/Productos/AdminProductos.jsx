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

    const lowerCaseSearch = terminoBusqueda.toLowerCase();
    return productos.filter((producto) => {
      if (filtro === 'ID') {
        return producto.id_producto.toString().includes(lowerCaseSearch);
      } else if (filtro === 'Nombre') {
        return producto.nombre.toLowerCase().includes(lowerCaseSearch);
      }
      return true;
    });
  }, [productos, filtro, terminoBusqueda]);

  const handleSaveProducto = async (producto) => {
    console.log('Guardar producto:', producto);
    const { id_producto, nombre, valor, cant } = producto;
    try {
      await axios.put(`http://localhost:3000/api/productos/${id_producto}`, { nombre, valor });
      await axios.put(`http://localhost:3000/api/productos/${id_producto}/peluquerias/${local.id_peluqueria}`, { cantidad: cant });

      setProductos((prevProductos) => 
        prevProductos.map((p) => (p.id_producto === id_producto ? producto : p))
      );

    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleActualizarStock = async (id_producto, id_peluqueria, cantidad) => {
    console.log('Actualizar stock del producto:', id_producto, id_peluqueria, cantidad);
    try {
      await axios.put(`http://localhost:3000/api/productos/${id_producto}/peluquerias/${id_peluqueria}`, { cantidad });
      const response = await axios.get(`http://localhost:3000/api/peluquerias/productos/${local.id_peluqueria}`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al actualizar stock del producto:', error);
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
          <TablaProductos
            productos={productosFiltrados} // Usar productosFiltrados en lugar de productos
            onSave={handleSaveProducto}
            onUpdateStock={handleActualizarStock}
            local={local} // Pasar local como propiedad a TablaProductos
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
