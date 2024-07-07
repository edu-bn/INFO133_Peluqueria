import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'



const RegistroCliente = ({ isOpen, onClose }) => {

    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl isRequired>
                <FormLabel>RUT separado sin digito verificador</FormLabel>
                <Input placeholder='11111111' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input placeholder='Martin' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Apellido</FormLabel>
                <Input placeholder='Alvarado' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Telefono</FormLabel>
                <Input placeholder='911111111' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Id Comuna</FormLabel>
                <Input placeholder='1 (Puerto Montt)' />
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
  
export default RegistroCliente;
  