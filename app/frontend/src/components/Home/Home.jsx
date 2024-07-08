import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, CloseButton, Button, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FormErrorMessage } from '@chakra-ui/react';
import Top from '../Top.jsx';
import SeleccionarRegion from './SeleccionarRegion.jsx';
import SeleccionarComuna from './SeleccionarComuna.jsx';
import SeleccionarLocal from './SeleccionarLocal.jsx';
import axios from 'axios';
import RegistroCliente from './RegistroCliente.jsx';
import './Home.css';

const Home = () => {
  const navigateTo = useNavigate();
  const [localSeleccionado, setLocalSeleccionado] = useState(null);
  const [regionSeleccionada, setRegionSeleccionada] = useState(null);
  const [comunaSeleccionada, setComunaSeleccionada] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rutCliente, setRutCliente] = useState('');
  const [rutInvalido, setRutInvalido] = useState(false);
  const [isRutOnDatabase, setIsRutOnDatabase] = useState(false);
  const [showRegistroCliente, setShowRegistroCliente] = useState(false);
  const [navegar, setNavegar] = useState('');

  const handleClickReserva = () => {
    setNavegar('/reserva');
    if (localSeleccionado) {
      setIsModalOpen(true);
    } else {
      setAlertaVisible(true);
    }
  };

  const handleClickProductos = () => {
    setNavegar('/productos');
    if (localSeleccionado) {
      setIsModalOpen(true);
    } else {
      setAlertaVisible(true);
    }
    if (isRutOnDatabase){
      navigateTo('/productos', { state: { local: localSeleccionado, rut: rutCliente } });
    }
  };

  const handleClickAdmin = () => {
    if (localSeleccionado) {
      navigateTo('/admin', { state: { local: localSeleccionado } });
    }
  };

  const handleCloseAlerta = () => {
    setAlertaVisible(false);
  };

  const handleConfirmarRegistro = () => {
    
    if (rutCliente.length < 7 || rutCliente.length > 9 || isNaN(parseInt(rutCliente, 10))){
      setRutInvalido(true)
      console.log('Rut inválido');
      return;
    }
    handleVerificarCliente(rutCliente);
  };

  const handleVerificarCliente = async (rut) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/clientes/${rut}`);
      const cliente = response.data;
      console.log(cliente);
      if (Object.keys(cliente).length === 0){
        console.log('cliente no encontrado');
        setIsRutOnDatabase(false);
        setShowRegistroCliente(true);
      } else {
        console.log('cliente encontrado', cliente);
        setIsRutOnDatabase(true);
        navigateTo(navegar, { state: { local: localSeleccionado, rut: rutCliente } });
      }
    } catch (error) {
      console.error('Error al verificar cliente:', error);
    }
  };

  const handleRegistro = () => {
    setShowRegistroCliente(false);
  }

  const handleRegistroConfirmado = () => {
    navigateTo(navegar, { state: { local: localSeleccionado, rut: rutCliente } });
  }

  return (
    <>
      <Top text={'Peluquería'} />
      <div className='horizontal-container'>
        <SeleccionarRegion setRegionSeleccionada={setRegionSeleccionada} />
        <SeleccionarComuna
          regionId={regionSeleccionada ? regionSeleccionada.id_region : null}
          setComunaSeleccionada={setComunaSeleccionada}
        />
        <SeleccionarLocal
          comunaId={comunaSeleccionada ? comunaSeleccionada.id_comuna : null}
          regionId={regionSeleccionada ? regionSeleccionada.id_region : null}
          setLocalSeleccionado={setLocalSeleccionado}
        />
      </div>
      {alertaVisible && <Alert status="warning" variant="subtle" mt={4} onClose={handleCloseAlerta}>
        <AlertIcon />
        <AlertTitle mr={2}>Por favor selecciona un local antes de continuar.</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" onClick={handleCloseAlerta} />
      </Alert>}
      <div className='middle-container'>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Cliente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired paddingBottom={'20px'} isInvalid={rutInvalido}>
                <FormLabel>Ingrese RUT del cliente sin dígito verificador</FormLabel>
                <Input placeholder='11111111' value={rutCliente} onChange={(e) => setRutCliente(e.target.value)} isInvalid={rutInvalido}/>
                {rutInvalido && <FormErrorMessage>Rut invalido.</FormErrorMessage>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleConfirmarRegistro}>Continuar</Button>
              <Button colorScheme="red" ml={3} onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className='button-container'>
        <Stack direction='row' spacing={200} align='center' justify='space-between'>
          <Button colorScheme="teal" onClick={handleClickReserva} size='lg'>
            Reservar hora
          </Button>
          <Button colorScheme="teal" onClick={handleClickAdmin} size='lg'>
            Administrar
          </Button>
          <Button colorScheme="teal" onClick={handleClickProductos} size='lg'>
            Productos
          </Button>
        </Stack>
      </div>
      <div className='down-bar' />
      {/* Renderizar RegistroCliente si el rut no está en la base de datos */}
      {showRegistroCliente && (
        <RegistroCliente isOpen={isModalOpen} onClose={handleRegistro} rutDefault={rutCliente} onConfirmar={handleRegistroConfirmado} />
      )}
    </>
  );
};

export default Home;
