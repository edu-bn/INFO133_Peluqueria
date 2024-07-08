import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'



const EditarCargo = ({ isOpen, onClose }) => {

    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cargo Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl isRequired>
                <FormLabel>Peluquero/ Manicurista check box :3</FormLabel>
                <Input placeholder='11111111' />
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button>
              Confirmar  
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
  
export default EditarCargo;
  