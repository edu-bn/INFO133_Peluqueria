import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react';


const RegistroCliente = ({ isOpen, onClose, rutDefault }) => {
  const [clientes, setClientes] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [rut, setRut] = useState(rutDefault);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');

  const [isRutInvalid, setIsRutInvalid] = useState(false);
  const [isNombreInvalid, setIsNombreInvalid] = useState(false);
  const [isApellidoInvalid, setIsApellidoInvalid] = useState(false);
  const [isTelefonoInvalid, setIsTelefonoInvalid] = useState(false);
  const [isComunaInvalid, setIsComunaInvalid] = useState(false);

  useEffect(() => {
    console.log('en useEffect');
    const fetchComunas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/comunas');
        setComunas(response.data);
      } catch (error) {
        console.error("Error fetching comunas:", error);
      }
    }
    fetchComunas();
  } , []);

  const handleSubmit = async () => {
    let valido = true;

    if (rut.length < 7 || rut.length > 9 || isNaN(parseInt(rut, 10))) {
      setIsRutInvalid(true);
      valido = false;
    } else{
      try {
        const response = await axios.get(`http://localhost:3000/api/clientes/${rut}`);
        const cliente = response.data;
        if(Object.keys(cliente).length !== 0){
          setIsRutInvalid(true);
          valido = false;
        } else {
          setIsRutInvalid(false);
        }
      } catch (error) {
        console.error('Error al verificar cliente:', error);
      }
    }

    if (nombre.length === 0) {
      setIsNombreInvalid(true);
      valido = false;
    } else {
    setIsNombreInvalid(false);
    }

    if (apellido.length === 0) {
      setIsApellidoInvalid(true);
      valido = false;
    } else {
    setIsApellidoInvalid(false);
    }

    if (telefono.length !== 9 || isNaN(parseInt(telefono, 10))){
      setIsTelefonoInvalid(true);
      valido = false;
    } else {
    setIsTelefonoInvalid(false);
    }

    if (selectedComuna === '') {
      setIsComunaInvalid(true);
      valido = false;
    } else {
    setIsComunaInvalid(false);
    }

    if (!valido) {
      return
    }

    const nuevoCliente = {
      rut_cliente: parseInt(rut),
      nombre,
      apellido,
      telefono: parseInt(telefono),
      id_comuna: parseInt(selectedComuna)
    };
    console.log('nuevoCliente:', nuevoCliente);
    try {
      const response = await axios.post('http://localhost:3000/api/clientes', nuevoCliente);
      setClientes([...clientes, response.data]);
    } catch (error) {
      console.error("Error creando cliente:", error);
    }

    onClose();
  };


    
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={isRutInvalid}>
            <FormLabel>RUT separado sin digito verificador</FormLabel>
            <Input defaultValue={rut} onChange={(e) => setRut(e.target.value)} placeholder='11111111'/>
            {isRutInvalid && <FormErrorMessage>RUT invalido o ya registrado.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={isNombreInvalid}>
            <FormLabel>Nombre</FormLabel>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
            {isNombreInvalid && <FormErrorMessage>Nombre es requerido.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={isApellidoInvalid}>
            <FormLabel>Apellido</FormLabel>
            <Input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
            {isApellidoInvalid && <FormErrorMessage>Apellido es requerido.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={isTelefonoInvalid}>
            <FormLabel>Telefono</FormLabel>
            <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder='911111111' />
            {isTelefonoInvalid && <FormErrorMessage>Telefono invalido.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={isComunaInvalid}>
            <FormLabel>Comuna</FormLabel>
            <Select value={selectedComuna} onChange={(e) => setSelectedComuna(e.target.value)} placeholder="Seleccione una opción">
              {comunas.map((comuna) => (
                <option key={comuna.id_comuna} value={comuna.id_comuna}>
                  {comuna.nombre}
                </option>
              ))}
            </Select>
            {isComunaInvalid && <FormErrorMessage>Comuna es requerida.</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="teal">
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
  
export default RegistroCliente;
  