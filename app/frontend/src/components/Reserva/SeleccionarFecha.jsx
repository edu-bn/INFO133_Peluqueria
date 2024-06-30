import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './SeleccionarFecha.css';
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SeleccionarFecha = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
        <label htmlFor="datePicker" className="datepicker-label">Seleccionar fecha</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
};

export default SeleccionarFecha;