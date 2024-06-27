// src/components/ProductList.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de productos
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

  return (
    <div>
      <h2>Listado de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.nombre} - ${producto.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
