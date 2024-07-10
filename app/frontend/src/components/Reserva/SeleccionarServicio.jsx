import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";


const SeleccionarServicio = ({setServicioSeleccionado, profesionalId}) => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                let url = "http://localhost:3000/api/servicios";
                if (profesionalId) {
                    url = `http://localhost:3000/api/servicios/profesional/${profesionalId}`;
                }

                const response = await axios.get(url);
                setServicios(response.data);
            } catch (error) {
                console.error("Error fetching servicios:", error);
            }
        };
        fetchServicios();

        }, [profesionalId]);

        const handleChange = (event) => {
            const id = event.target.value;
            const selectedServicio = servicios.find(servicio => servicio.id_servicio === parseInt(id));
            setServicioSeleccionado(selectedServicio);

        }

        return (
            <div>
                <FormControl>
                    <FormLabel>Seleccionar Servicio</FormLabel>
                    <Select 
                        placeholder="Seleccione una opción" 
                        onChange={handleChange}
                    >
                        {servicios.map((servicio) => (
                            <option key={servicio.id_servicio} value={servicio.id_servicio}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );


}

export default SeleccionarServicio