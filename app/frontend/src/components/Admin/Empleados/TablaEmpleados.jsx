import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import EditarCargo from './EditarCargo.jsx';
import axios from 'axios';

const TablaEmpleados = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const getEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/empleados');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };
    getEmpleados();
  }, []);

  const handleEditarCargo = (empleado) => {
    setSelectedEmpleado(empleado);
    setIsModalOpen(true);
  };

  const handleEliminarEmpleado = async (rut_empleado) => {
    try {
      const fecha_fin = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      await axios.put(`http://localhost:3000/api/empleados/${rut_empleado}/fecha-fin`, { fecha_fin });
      const updatedEmpleados = empleados.filter(emp => emp.rut_empleado !== rut_empleado);
      setEmpleados(updatedEmpleados);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleCloseModal = async (idServicios, isPeluquero, isManicurista) => {
    console.log('handle:', idServicios, isPeluquero, isManicurista);

    try {
      // Actualizar el cargo del empleado
      const response = await axios.post('http://localhost:3000/api/empleados/actualizar-servicios', {
        rut_empleado: selectedEmpleado.rut_empleado,
        servicios: idServicios,
        isPeluquero,
        isManicurista
      });

      console.log('Cargo actualizado:', response.data);

      // Actualizar la lista de empleados después de la edición
      const updatedEmpleados = empleados.map(emp => {
        if (emp.rut_empleado === selectedEmpleado.rut_empleado) {
          return { ...emp, isPeluquero, isManicurista };
        }
        return emp;
      });

      setEmpleados(updatedEmpleados);
    } catch (error) {
      console.error('Error al editar cargo:', error);
    }
    setIsModalOpen(false);
    setSelectedEmpleado(null);
  };

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
          {empleados.map((empleado) => (
            <Tr key={empleado.rut_empleado}>
              <Td>
                <Button colorScheme="red" onClick={() => handleEliminarEmpleado(empleado.rut_empleado)}>
                   - 
                </Button>
              </Td>
              <Td>{empleado.rut_empleado}</Td>
              <Td>{empleado.nombre} {empleado.apellido}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClick={() => handleEditarCargo(empleado)}>
                  Editar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedEmpleado && (
        <EditarCargo isOpen={isModalOpen} onClose={handleCloseModal} empleado={selectedEmpleado} />
      )}
    </TableContainer>
  );
};

export default TablaEmpleados;
