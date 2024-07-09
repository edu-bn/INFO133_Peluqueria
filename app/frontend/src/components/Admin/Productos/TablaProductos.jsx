import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

const TablaProductos = ({ productos, onSave, onAddNew }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [addingNew, setAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState({ nombre: '', valor: '', cant: '' });

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


  const handleAddNew = () => {
    setAddingNew(true);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // manejamos el guardado de un nuevo producto
  const handleSaveNew = () => {
    onAddNew(newProduct);
    setAddingNew(false);
    setNewProduct({ nombre: '', valor: '', cant: '' });
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewProduct({ nombre: '', valor: '', cant: '' });
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
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!addingNew && (
            <Tr>
              <Td>-</Td>
              <Td>
                <Button colorScheme="teal" size="sm" onClick={handleAddNew}>
                  Añadir Nuevo Producto
                </Button>
              </Td>
              <Td />
              <Td />
              <Td />
            </Tr>
          )}
          {addingNew && (
            <Tr>
              <Td>-</Td>
              <Td>
                <Input
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleNewInputChange}
                />
              </Td>
              <Td>
                <Input
                  name="valor"
                  value={newProduct.valor}
                  onChange={handleNewInputChange}
                  type="number"
                />
              </Td>
              <Td>
                <Input
                  name="cant"
                  value={newProduct.cant}
                  onChange={handleNewInputChange}
                  type="number"
                />
              </Td>
              <Td>
                <Button colorScheme="green" size="sm" onClick={handleSaveNew}>
                  Guardar
                </Button>
                <Button colorScheme="red" size="sm" onClick={handleCancelNew} ml={2}>
                  Cancelar
                </Button>
              </Td>
            </Tr>
          )}
          {productos.map((producto, index) => (
            <Tr key={producto.id_producto}>
              <Td>{producto.id_producto}</Td>
              <Td>{producto.nombre}</Td>
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
                    <Button colorScheme="green" size="sm" onClick={handleSaveClick}>
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
