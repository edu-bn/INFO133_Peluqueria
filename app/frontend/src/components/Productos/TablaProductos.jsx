import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import AddButton from './AddButton.jsx';

const TablaProductos = ({ productos, onAddButtonClick }) => {
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
              <Td>{producto.stock}</Td>
              <Td>
                <AddButton onClick={() => onAddButtonClick(producto)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
