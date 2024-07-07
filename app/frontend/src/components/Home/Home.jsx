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
  const [regionSeleccionada, setRegionSeleccionada] = useState(null);
  const [comunaSeleccionada, setComunaSeleccionada] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleClickReserva = () => {
    if(localSeleccionado){
      navigateTo('/reserva', { state: {local: localSeleccionado } });
    } else {
      setAlertaVisible(true);
    }
  };

  const handleClickProductos= () => {
    if(localSeleccionado){
      navigateTo('/productos', { state: {local: localSeleccionado } });
    } else {
      setAlertaVisible(true);
    }    
  };

  const handleClickAdmin = () => {
    if(localSeleccionado){
      navigateTo('/admin', { state: {local: localSeleccionado } });
    } else {
      setAlertaVisible(true);
    }
  }

  const handleCloseAlerta = () => {
    console.log('en handleCloseAlerta');
    setAlertaVisible(false);
  }

  return (
    <>
      <Top text={'peluqueria'}/>  
      <div className='horizontal-container'>
        <SeleccionarRegion setRegionSeleccionada={setRegionSeleccionada}/>
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
    </>
  );
};

export default Home;
