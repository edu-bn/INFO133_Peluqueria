import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const SeleccionarHora = ({ setHoraSeleccionada, profesionalId, fecha, servicio }) => {
    const [horas, setHoras] = useState([]);


    useEffect(() => {
        const fetchHoras = async () => {
            try {
                if (profesionalId && fecha && servicio) {

                    const formattedDate = formatDate(fecha); // Formatea la fecha a 'yy-mm-dd'
                    const response = await axios.get(`http://localhost:3000/api/reservas/profesional/${profesionalId}/fecha/${formattedDate}/horas-disponibles`);
                    setHoras(response.data);

                }
            } catch (error) {
                console.error("Error fetching horas:", error);
            }
        };
        fetchHoras();
    }, [profesionalId, fecha, servicio]);

    const formatDate = (date) => {
        const year = date.getFullYear().toString().slice(); // Obtiene los últimos dos dígitos del año
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Obtiene el mes, ajustado para comenzar en 0
        const day = ('0' + date.getDate()).slice(-2); // Obtiene el día del mes

        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        const indice = event.target.value;

        setHoraSeleccionada(horas[indice].hora_disponible);
    }

    const formatTime = (timeString) => {
        const time = timeString.substring(11, 16);
        return time;
    };

    return (
        <div>
            <FormControl>
                <FormLabel>Seleccionar Hora</FormLabel>
                <Select placeholder="Seleccione una opción" onChange={handleChange}>
                    {horas.map((hora, index )=> (
                        <option key={index} value={index}>{formatTime(hora.hora_disponible)}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SeleccionarHora;
