import { useState } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";

import Top from "../Top.jsx";
import SeleccionarServicio from "./SeleccionarServicio.jsx";
import SeleccionarProfesional from "./SeleccionarProfesional.jsx";
import SeleccionarFecha from "./SeleccionarFecha.jsx";
import SeleccionarHora from './SelecionarHora.jsx';
import ReservarButton from './ReservarButton.jsx';

const Reserva = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { local } = location.state || {};
  const { rut } = location.state || {};
  let showAlert = false;
  if (!local && !rut) {
    showAlert = true;
  }
  console.log('local, rut', local, rut);

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false)

  const handleReturnHome = () => {
    navigateTo("/");
  };
  
  const handleReservarSuccess = () => {
    setAlertMessage("Reserva realizada con éxito.");
  };

  return (
  <>
    <Top text={'Reservar cita'}/>
    {showAlert ? (
      <Alert status="error" variant="subtle" mt={4}>
      <AlertIcon />
      <AlertTitle>Por favor selecciona un local e ingrese un cliente antes de continuar.</AlertTitle>
      <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
        Volver a la página principal
      </Button>
    </Alert>
    ) : (
      <div>
    <div className="horizontal-container">
      <SeleccionarFecha setFechaSeleccionada={setFechaSeleccionada}/>
      <SeleccionarProfesional 
        peluqueriaId={local.id_peluqueria}
        setProfesionalSeleccionado={setProfesionalSeleccionado}
        servicioId={servicioSeleccionado ? servicioSeleccionado.id_servicio : null}
      /> 
      <SeleccionarServicio 
        setServicioSeleccionado={setServicioSeleccionado}
        profesionalId={profesionalSeleccionado ? profesionalSeleccionado.id_profesion : null}
      />
      <SeleccionarHora 
        setHoraSeleccionada={setHoraSeleccionada}
        profesionalId={profesionalSeleccionado ? profesionalSeleccionado.id_profesion : null}
        fecha={fechaSeleccionada ? fechaSeleccionada : null}
        servicio={servicioSeleccionado ? servicioSeleccionado.id_servicio : null}
        />
      </div>

      {alertMessage && (
          <Alert status="success" variant="subtle" mt={4}>
            <AlertIcon />
            <AlertTitle>{alertMessage}</AlertTitle>
          </Alert>
        )}
        
      <ReservarButton hora={horaSeleccionada} profesional={profesionalSeleccionado} servicio={servicioSeleccionado} rut_cliente={rut} local={local} onSuccess={handleReservarSuccess}/>
      </div>
      )
    }
  </>
  );
};

export default Reserva;
