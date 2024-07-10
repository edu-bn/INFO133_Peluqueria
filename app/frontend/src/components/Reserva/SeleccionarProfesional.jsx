import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const SeleccionarProfesional = ({peluqueriaId, setProfesionalSeleccionado, servicioId}) => {
    const [profesionales, setProfesionales] = useState([]);

    useEffect(() => {
        const fetchProfesionales = async () => {
            try {
                let url = `http://localhost:3000/api/profesionales/peluqueria/${peluqueriaId}`;
                if (servicioId) {
                    url = `http://localhost:3000/api/profesionales/servicio/${servicioId}/peluqueria/${peluqueriaId}`;
                }
                const response = await axios.get(url);
                setProfesionales(response.data);
            } catch (error) {
                console.error('Error al obtener profesionales:', error);
            }
        }
        fetchProfesionales();
    }
    , [peluqueriaId, servicioId]);

    const handleChange = (event) => {
        const selectedProfesional = profesionales.find(profesional => profesional.id_profesion === parseInt(event.target.value));
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