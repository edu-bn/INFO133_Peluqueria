import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SeleccionarFecha.css';

const SeleccionarFecha = ({ setFechaSeleccionada }) => {
  const [startDate, setStartDate] = useState(new Date());

  // Función para manejar el cambio de fecha
  const handleDateChange = (date) => {
    setStartDate(date); // Actualiza startDate con la nueva fecha seleccionada
    setFechaSeleccionada(date); // Pasa la fecha seleccionada a setFechaSeleccionada
  };

  return (
    <div>
      <label htmlFor="datePicker" className="datepicker-label">Seleccionar fecha</label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange} // Llama a handleDateChange cuando cambia la fecha
        dateFormat="dd-MM-yy" // Formato para mostrar la fecha con guiones
        className="date-picker" // Clase CSS para personalizar estilos si es necesario
      />
    </div>
  );
};

export default SeleccionarFecha;
