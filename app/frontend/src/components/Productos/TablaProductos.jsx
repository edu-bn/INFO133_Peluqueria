import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import AddButton from './AddButton.jsx';

const TablaProductos = ({ productos, onAddButtonClick }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddButtonClick = (producto, cantidad) => {
    if (cantidad > 0) {
      const newSelectedProduct = { id: producto.id_producto, cantidad };
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        newSelectedProduct
      ]);
      onAddButtonClick(producto, cantidad);
    }
  };
  

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Id producto</Th>
            <Th>Nombre del producto</Th>
            <Th isNumeric>Precio</Th>
            <Th>Stock</Th>
            <Th>Añadir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((producto) => (
            <Tr key={producto.id_producto}>
              <Td>{producto.id_producto}</Td>
              <Td>{producto.nombre}</Td>
              <Td isNumeric>${producto.valor}</Td>
              <Td>{producto.cant}</Td>
              <Td>
                <AddButton
                  onClick={(cantidad) => handleAddButtonClick(producto, cantidad)}
                  maxStock= {producto.cant}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
