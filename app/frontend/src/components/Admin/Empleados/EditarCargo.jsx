import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'
  import { Switch } from '@chakra-ui/react'
  import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
  import { Stack } from '@chakra-ui/react';

  
  const EditarCargo = ({ isOpen, onClose }) => {

    const servicios_peluquero = [
      { id_servicio: 1, nombre: 'Corte de Pelo', costo: 10000, duracion: 1 },
      { id_servicio: 2, nombre: 'Tinte', costo: 20000, duracion: 3 },
      { id_servicio: 3, nombre: 'Alisado', costo: 30000, duracion: 2 }
    ];
    
    const servicios_manicurista = [
      {id_servicio: 1, nombre: 'Maquillaje', costo: 10000, duracion: 1},
      {id_servicio: 2, nombre: 'Manicure', costo: 20000, duracion: 3},
      {id_servicio: 3, nombre: 'Pedicure', costo: 30000, duracion: 2},
    ];

    const [isPeluquero, setIsPeluquero] = useState(false);
    const [isManicurista, setIsManicurista] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
      new Array(servicios_peluquero.length).fill(false),
      new Array(servicios_manicurista.length).fill(false)
    );

    const handlePeluqueroChange = () => setIsPeluquero(!isPeluquero);
    
    const handleManicuristaChange = () => setIsManicurista(!isManicurista);

    const handleCheckboxChange = (index) => {
      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      setCheckedItems(updatedCheckedItems);
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Cargo Empleado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display='flex' alignItems='center' mb={4}>
              <FormLabel htmlFor='is-peluquero' mb='0'>
                Peluquero
              </FormLabel>
              <Switch id='is-peluquero' isChecked={isPeluquero} onChange={handlePeluqueroChange} />
            </FormControl>
            <FormControl display='flex' alignItems='center' mb={4}>
              <FormLabel htmlFor='is-manicurista' mb='0'>
                Manicurista
              </FormLabel>
              <Switch id='is-manicurista' isChecked={isManicurista} onChange={handleManicuristaChange}/>
            </FormControl>
            {isPeluquero && (
              <CheckboxGroup colorScheme='teal'>
                <Stack spacing={[5, 1]} direction={['column', 'row']}>
                  {servicios_peluquero.map((servicio, index) => (
                    <Checkbox
                      key={servicio.id_servicio}
                      isChecked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                    >
                      {servicio.nombre}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
            {isManicurista && (
              <CheckboxGroup colorScheme='teal'>
                <Stack spacing={[5, 1]} direction={['column', 'row']}>
                  {servicios_manicurista.map((servicio, index) => (
                    <Checkbox
                      key={servicio.id_servicio}
                      isChecked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                    >
                      {servicio.nombre}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditarCargo;