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

    return (
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Eliminar Empleado</Th>
              <Th>Id Empleado</Th>
              <Th>Nombre del Empleado</Th>
              <Th >Editar cargo</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Td>
                <Button colorScheme="red"> - </Button>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td> 
                <Button colorScheme="blue" size="sm" onClick={handleEditarCargo}>
                    Editar
                </Button>
                <EditarCargo isOpen={isModalOpen} onClose={handleCloseModal}></EditarCargo>
            </Td>
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default TablaEmpleados;
  