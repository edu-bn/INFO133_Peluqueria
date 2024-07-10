import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const SeleccionarProfesional = ({idPeluqueria, setProfesionalSeleccionado}) => {
    const [profesionales, setProfesionales] = useState([]);
    console.log('idPeluqueria', idPeluqueria);

    useEffect(() => {
        const fetchProfesionales = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/profesionales/peluqueria/${idPeluqueria}`);
                setProfesionales(response.data);
            } catch (error) {
                console.error('Error al obtener profesionales:', error);
            }
        }
        fetchProfesionales();
    }
    , [idPeluqueria]);

    const handleChange = (event) => {
        const selectedProfesional = profesionales.find(profesional => profesional.id_profesion === parseInt(event.target.value));
        console.log('selectedProfesional', selectedProfesional);
        setProfesionalSeleccionado(selectedProfesional);
    }


    return(
        <div>
            <FormControl>
                <FormLabel>Seleccionar profesionales</FormLabel>
                <Select placeholder="Seleccione una opcion" onChange={handleChange}>
                    {profesionales.map((option)=> (
                      <option key={option.id_profesion} value={option.id_profesion}>
                      {option.nombre}
                    </option>   
                    ))}
                </Select>
            </FormControl>
        </div>
    )


}

export default SeleccionarProfesional