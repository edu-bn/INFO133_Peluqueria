import { useState } from 'react';
import ListaProductos from "./ListaProductos.jsx";
import Top from "../Top.jsx";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const Productos = () => {
  const [productos, setProductos] = useState([]);

  // Función para recibir los productos desde ListaProductos
  const handleProductosLoaded = (productos) => {
    setProductos(productos);
  };

  return (
    <div>
      <Top text={'Productos'}></Top>

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id producto</Th>
              <Th>Nombre del producto</Th>
              <Th isNumeric>Precio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((producto) => (
              <Tr key={producto.id_producto}>
                <Td>{producto.id_producto}</Td>
                <Td>{producto.nombre}</Td>
                <Td isNumeric>${producto.valor}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <ListaProductos onProductosLoaded={handleProductosLoaded} />
    </div>
  );
};

export default Productos;
