import { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { FormControl, FormLabel, Switch, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import axios from 'axios';

const EditarCargo = ({ isOpen, onClose, empleado }) => {
  const [serviciosPeluquero, setServiciosPeluquero] = useState([]);
  const [serviciosManicurista, setServiciosManicurista] = useState([]);
  const [isPeluquero, setIsPeluquero] = useState(false);
  const [isManicurista, setIsManicurista] = useState(false);
  const [checkedItemsPeluquero, setCheckedItemsPeluquero] = useState([]);
  const [checkedItemsManicurista, setCheckedItemsManicurista] = useState([]);

  useEffect(() => {
    const getServicios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/servicios');
        const servicios = response.data;
        setServiciosPeluquero(servicios.filter((servicio) => servicio.especialidad === 'peluquero'));
        setServiciosManicurista(servicios.filter((servicio) => servicio.especialidad === 'manicurista'));
        setCheckedItemsPeluquero(new Array(servicios.filter((servicio) => servicio.especialidad === 'peluquero').length).fill(false));
        setCheckedItemsManicurista(new Array(servicios.filter((servicio) => servicio.especialidad === 'manicurista').length).fill(false));
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };
    getServicios();
  }, []);

  useEffect(() => {
    const getServiciosEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/empleados/${empleado.rut_empleado}/servicios`);
        const serviciosEmpleado = response.data;
        
        // Obtener IDs de servicios de peluquero y manicurista
        const serviciosPeluqueroIds = serviciosPeluquero.map(servicio => servicio.id_servicio);
        const serviciosManicuristaIds = serviciosManicurista.map(servicio => servicio.id_servicio);

        // Filtrar servicios seleccionados del empleado
        const checkedPeluqueroIds = serviciosPeluqueroIds.filter(id => serviciosEmpleado.some(serv => serv.id_servicio === id));
        const checkedManicuristaIds = serviciosManicuristaIds.filter(id => serviciosEmpleado.some(serv => serv.id_servicio === id));

        // Actualizar estados y checkboxes
        setCheckedItemsPeluquero(serviciosPeluquero.map(servicio => checkedPeluqueroIds.includes(servicio.id_servicio)));
        setCheckedItemsManicurista(serviciosManicurista.map(servicio => checkedManicuristaIds.includes(servicio.id_servicio)));

        setIsPeluquero(checkedPeluqueroIds.length > 0);
        setIsManicurista(checkedManicuristaIds.length > 0);
      } catch (error) {
        console.error('Error al obtener servicios del empleado:', error);
      }
    };

    if (empleado) {
      getServiciosEmpleado();
    }
  }, [empleado, serviciosPeluquero, serviciosManicurista]);

  const handleCheckboxChange = (index, isPeluquero) => {
    if (isPeluquero) {
      const updatedCheckedItems = [...checkedItemsPeluquero];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      setCheckedItemsPeluquero(updatedCheckedItems);
    } else {
      const updatedCheckedItems = [...checkedItemsManicurista];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      setCheckedItemsManicurista(updatedCheckedItems);
    }
  };

  const handleCloseModal = () => {
    const idServiciosSeleccionados = [
      ...serviciosPeluquero.filter((_, index) => checkedItemsPeluquero[index]).map(servicio => servicio.id_servicio),
      ...serviciosManicurista.filter((_, index) => checkedItemsManicurista[index]).map(servicio => servicio.id_servicio)
    ];

    console.log('Editar cargo:', idServiciosSeleccionados, isPeluquero, isManicurista);
    onClose(idServiciosSeleccionados, isManicurista, isPeluquero);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cargo Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display='flex' alignItems='center' mb={4}>
            <FormLabel htmlFor='is-peluquero' mb='0'>
              Peluquero
            </FormLabel>
            <Switch id='is-peluquero' isChecked={isPeluquero} onChange={() => setIsPeluquero(!isPeluquero)} />
          </FormControl>
          <FormControl display='flex' alignItems='center' mb={4}>
            <FormLabel htmlFor='is-manicurista' mb='0'>
              Manicurista
            </FormLabel>
            <Switch id='is-manicurista' isChecked={isManicurista} onChange={() => setIsManicurista(!isManicurista)} />
          </FormControl>
          <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4} maxHeight="200px" overflowY="auto">
            {isPeluquero && (
              <CheckboxGroup colorScheme='teal'>
                <Stack spacing={[1, 2]} direction='column'>
                  {serviciosPeluquero.map((servicio, index) => (
                    <Checkbox
                      key={servicio.id_servicio}
                      id={`peluquero-${index}`}
                      isChecked={checkedItemsPeluquero[index]}
                      onChange={() => handleCheckboxChange(index, true)}
                    >
                      {servicio.nombre}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
            {isManicurista && (
              <CheckboxGroup colorScheme='teal'>
                <Stack spacing={[1, 2]} direction='column'>
                  {serviciosManicurista.map((servicio, index) => (
                    <Checkbox
                      key={servicio.id_servicio}
                      id={`manicurista-${index}`}
                      isChecked={checkedItemsManicurista[index]}
                      onChange={() => handleCheckboxChange(index, false)}
                    >
                      {servicio.nombre}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseModal}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditarCargo;
