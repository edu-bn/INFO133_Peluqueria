import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

const TablaProductos = ({ productos, onSave }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEditClick = (index, producto) => {
    setEditIndex(index);
    setEditValues({ ...producto });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(editValues);
    setEditIndex(null);
    setEditValues({});
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditValues({});
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id producto</Th>
            <Th>Nombre del producto</Th>
            <Th isNumeric>Precio</Th>
            <Th>Stock</Th>
            <Th>Actualizar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((producto, index) => (
            <Tr key={producto.id_producto}>
              <Td>{producto.id_producto}</Td>
              <Td>
                {editIndex === index ? (
                  <Input
                    name="nombre"
                    value={editValues.nombre}
                    onChange={handleInputChange}
                  />
                ) : (
                  producto.nombre
                )}
              </Td>
              <Td isNumeric>
                {editIndex === index ? (
                  <Input
                    name="valor"
                    value={editValues.valor}
                    onChange={handleInputChange}
                    type="number"
                  />
                ) : (
                  `$${producto.valor}`
                )}
              </Td>
              <Td>
                {editIndex === index ? (
                  <Input
                    name="cant"
                    value={editValues.cant}
                    onChange={handleInputChange}
                    type="number"
                  />
                ) : (
                  producto.cant
                )}
              </Td>
              <Td>
                {editIndex === index ? (
                  <>
                    <Button colorScheme="blue" size="sm" onClick={handleSaveClick}>
                      Guardar
                    </Button>
                    <Button colorScheme="red" size="sm" onClick={handleCancelClick} ml={2}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button colorScheme="blue" size="sm" onClick={() => handleEditClick(index, producto)}>
                    Editar
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
