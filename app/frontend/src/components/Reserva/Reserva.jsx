import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { useNavigate, useLocation} from "react-router-dom";
import Top from "../Top.jsx";
import SeleccionarServicio from "./SeleccionarServicio.jsx";
import SeleccionarProfesional from "./SeleccionarProfesional.jsx";
import SeleccionarFecha from "./SeleccionarFecha.jsx";

const Reserva = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { local } = location.state || {};
  const showAlert = !local;

  const handleReturnHome = () => {
    navigateTo("/");
  };

  return (
  <>
    <Top text={'Reservar cita'}/>
    {showAlert ? (
      <Alert status="error" variant="subtle" mt={4}>
      <AlertIcon />
      <AlertTitle>Por favor selecciona un local antes de continuar.</AlertTitle>
      <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
        Volver a la página principal
      </Button>
    </Alert>
    ) : (<div className="horizontal-container">
          <SeleccionarServicio/>
          <SeleccionarProfesional/>
          <SeleccionarFecha/>
      </div>)
    }
  </>
  );
};

export default Reserva;
