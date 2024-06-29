import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const servicios = [
    {id: 1, name : 'Corte de pelo'},
    {id: 2, name : 'Lavado de pelo'},
    {id: 3, name : 'Manicure'},
    {id: 4, name : 'Pedicure'},
    {id: 5, name : 'lavao de poto'},
]

const SeleccionarServicio = () => {

    return(
        <div>
            <FormControl>
                <FormLabel>Seleccionar Servicio</FormLabel>
                <Select placeholder="Seleccione una opcion">
                    {servicios.map((option)=> (
                      <option key={option.id} value={option.name}>
                      {option.name}
                    </option>   
                    ))}
                </Select>
            </FormControl>
        </div>
    )


}

export default SeleccionarServicio