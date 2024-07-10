import { Button } from "@chakra-ui/react";
import axios from "axios";

const ReservarButton = ({hora, profesional, servicio, rut_cliente, local}) => {
    
    


    const reservar = async () => {
        try {
            if(!hora || !profesional || !servicio)
                return
            const responseBoleta = await axios.post(`http://localhost:3000/api/reservas/crear-boleta-cita/${servicio.costo}/${rut_cliente}/${local.id_peluqueria}`);
            const id_boleta = responseBoleta.data.id_boleta_cita;
            console.log('id_boleta:', id_boleta);
            
            hora = hora.replace('T', ' ');
            hora = hora.replace('Z', '');
            
            // Convertir hora a un objeto Date
            let fechaHora = new Date(hora);
            
            for (let i = 0; i < servicio.duracion; i++) {
                // Formatear la fecha y hora en el formato deseado
                let fechaHoraFormateada = fechaHora.toISOString().slice(0, 19).replace('T', ' ');
            
                console.log('Hora:', fechaHoraFormateada);
                
                // const responseCita = await axios.post(`http://localhost:3000/api/reservas/crear-cita/${fechaHoraFormateada}/${rut_cliente}/${id_boleta}/${servicio.id_servicio}/${profesional.id_profesion}`);
                // console.log('Cita creada:', responseCita.data);
            
                // Sumar 30 minutos para la siguiente iteración
                fechaHora.setMinutes(fechaHora.getMinutes() + 30);
            }
            
            
        } catch (error) {
            console.error("Error al reservar:", error);
        }
    };

    return (
        <Button colorScheme="teal" onClick={reservar}>
            Reservar
        </Button>
    );
}

export default ReservarButton;