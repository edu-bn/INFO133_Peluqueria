import Top from "../Top.jsx";

import SeleccionarServicio from "./SeleccionarServicio.jsx";
import SeleccionarProfesional from "./SeleccionarProfesional.jsx";
import SeleccionarFecha from "./SeleccionarFecha.jsx";

const Servicios = () => {
  return (
  <>
    <Top text={'Reservar cita'}/>
    <div className="horizontal-container">
        <SeleccionarServicio/>
        <SeleccionarProfesional/>
        <SeleccionarFecha/>
    </div>
  </>
  );
};

export default Servicios;
