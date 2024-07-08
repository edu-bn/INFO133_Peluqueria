import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import EditarCargo from './EditarCargo.jsx';

const TablaEmpleados = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditarCargo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tabla_empleados = [
    { rut_empleado: 102543, nombre: 'Goku', apellido: 'Sanchez', telefono: 925742587, id_comuna: 2 },
    { rut_empleado: 124543, nombre: 'Juan', apellido: 'Lopez', telefono: 925532587, id_comuna: 1 },
    { rut_empleado: 169543, nombre: '2B', apellido: 'Cortez', telefono: 9257275587, id_comuna: 4 },
    { rut_empleado: 196543, nombre: 'Roberto', apellido: 'Sierra', telefono: 925642587, id_comuna: 3 },
  ];

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Eliminar Empleado</Th>
            <Th>Id Empleado</Th>
            <Th>Nombre del Empleado</Th>
            <Th>Editar cargo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tabla_empleados.map((empleado) => (
            <Tr key={empleado.rut_empleado}>
              <Td>
                <Button colorScheme="red"> - </Button>
              </Td>
              <Td>{empleado.rut_empleado}</Td>
              <Td>{empleado.nombre} {empleado.apellido}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClick={handleEditarCargo}>
                  Editar
                </Button>
                <EditarCargo isOpen={isModalOpen} onClose={handleCloseModal} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TablaEmpleados;
