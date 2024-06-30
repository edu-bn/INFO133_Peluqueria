import { useState, useEffect } from "react";
import axios from "axios";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const SeleccionarEmpleado = ({setEmpleadsetEmpleadoSeleccionadoos }) => {
    const[profesionales, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchEmpleados = async () =>{
            try {
                const response = await axios.get("http://localhost:3000/api/empleado");
                setEmpleados(response.data);
            } catch (error) {
                console.error("Error fetching Empleado:", error);
            }
        };

        fetchEmpleados();
    }, []);



    const handleChange = (event) => {
        const selectedProfesional = profesionales.find(empleado => empleado.rut_empleado === parseInt(event.target.value));
        setEmpleadsetEmpleadoSeleccionadoos(selectedProfesional);
      };
    
    return(
        <div>
            <FormControl>
                <FormLabel>Seleccionar profesional</FormLabel>
                <Select placeholder="Seleccione una opcion" onChange={handleChange}>
                    {profesionales.map((empleado)=> (
                      <option key={empleado.rut_empleado} value={empleado.rut_empleado}>
                      {empleado.nombre}
                    </option>   
                    ))}
                </Select>
            </FormControl>
        </div>
    )


}

export default SeleccionarEmpleado

