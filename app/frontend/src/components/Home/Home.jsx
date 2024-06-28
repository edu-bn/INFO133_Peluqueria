import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, CloseButton, Button, Stack } from '@chakra-ui/react';

import Top from '../Top.jsx';
import SeleccionarRegion from './SeleccionarRegion.jsx';
import SeleccionarComuna from './SeleccionarComuna.jsx';
import SeleccionarLocal from './SeleccionarLocal.jsx';
import './Home.css';


const Home = () => {
  const navigateTo = useNavigate();
  const [localSeleccionado, setLocalSeleccionado] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleClickReserva = () => {
    console.log('en handleClickReserva');
    if(localSeleccionado){
      navigateTo('/reserva');
    } else {
      setAlertaVisible(true);
    }
  };

  const handleClickProductos= () => {
    navigateTo('/productos');
  };

  const handleCloseAlerta = () => {
    console.log('en handleCloseAlerta');
    setAlertaVisible(false);
  }

  return (
    <>
      <Top text={'peluqueria'}/>  
      <div className='horizontal-container'>
        <SeleccionarRegion/>
        <SeleccionarComuna/>
        <SeleccionarLocal setLocalSeleccionado={setLocalSeleccionado}/>
      </div>
      {alertaVisible && <Alert status="warning" variant="subtle" mt={4} onClose={handleCloseAlerta}>
        <AlertIcon />
        <AlertTitle mr={2}>Por favor selecciona un local antes de continuar.</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" onClick={handleCloseAlerta} />
      </Alert>}
      <div className='button-container'>
        <Stack direction='row' spacing={500} align='center' justify='space-between'>
          <Button colorScheme="teal" onClick={handleClickReserva} size='lg'>
            Reservar hora
          </Button>
          <Button colorScheme="teal" onClick={handleClickProductos} size='lg'>
            Productos
          </Button>
        </Stack>
      </div>
      

      <div className='down-bar' />
    </>
  );
};

export default Home;
