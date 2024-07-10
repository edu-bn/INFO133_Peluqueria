import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

const NuevoEmpleado = ({ isOpen, onClose }) => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idComuna, setIdComuna] = useState('');

    const handleSubmit = async () => {
      console.log(rut, nombre, apellido, telefono, idComuna);
        try {
            if (!rut || !nombre || !apellido || !telefono || !idComuna) {
                console.error('Faltan campos requeridos');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/empleados/agregar-empleado', {
                rut_empleado: rut,
                nombre,
                apellido,
                telefono,
                id_comuna: idComuna,
            });
            console.log('Respuesta del servidor:', response.data);
            onClose(); // Cierra el modal después de agregar el empleado exitosamente
        } catch (error) {
            console.error('Error al agregar nuevo empleado:', error);
            // Manejo de errores - podrías mostrar un mensaje al usuario, etc.
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Registrar Empleado Nuevo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>RUT separado sin dígito verificador</FormLabel>
                        <Input placeholder='11111111' value={rut} onChange={(e) => setRut(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Apellido</FormLabel>
                        <Input placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Teléfono</FormLabel>
                        <Input placeholder='911111111' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>ID Comuna</FormLabel>
                        <Input placeholder='1 - 20' value={idComuna} onChange={(e) => setIdComuna(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>
                        Confirmar  
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NuevoEmpleado;
