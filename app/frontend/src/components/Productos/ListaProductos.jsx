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
      <div>
      
      <ul className='lista_productos'>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.id_producto} - {producto.nombre} - ${producto.valor} - {producto.stock}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ListaProductos;
