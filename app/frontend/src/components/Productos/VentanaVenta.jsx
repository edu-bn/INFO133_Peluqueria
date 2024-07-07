import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const VentanaVenta = ({ isOpen, onClose }) => {
  const navigateTo = useNavigate();

  const handleClickHome = () => {
    navigateTo("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Compra realizada</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          descontar stock :v
          detalle?
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" right={"30px"} onClick={handleClickHome}>
            Salir
          </Button>
          <Button variant="ghost">
            Seguir comprando
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VentanaVenta;
