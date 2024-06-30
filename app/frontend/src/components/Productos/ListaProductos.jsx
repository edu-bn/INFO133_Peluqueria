import { useEffect, useState } from 'react';
import axios from 'axios';

const ListaProductos = ({ onProductosLoaded }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de productos
    const getProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        setProductos(response.data);
        // Llama a la función de callback para pasar los productos al componente padre
        if (onProductosLoaded) {
          onProductosLoaded(response.data);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    getProductos();
  }, [onProductosLoaded]);

  return (
    <div>
      <ul className='lista_productos'>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.id_producto} - {producto.nombre} - ${producto.valor} - {producto.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
