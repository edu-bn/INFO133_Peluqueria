import { useEffect } from 'react';
import axios from 'axios';

// Componente que obtiene la lista de productos desde el backend
const ListaProductos = ({ onProductosLoaded }) => {
  useEffect(() => {
    const getProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        if (onProductosLoaded) {
          onProductosLoaded(response.data);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    getProductos();
  }, [onProductosLoaded]);

  return null; // Este componente no necesita renderizar nada
};

export default ListaProductos;
