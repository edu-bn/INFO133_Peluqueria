import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const fechas = [
    {id: 1, name : 'hoy'},
    {id: 2, name : 'mañana'},
    {id: 3, name : 'ayer'},
    {id: 4, name : 'en 10'},
    {id: 5, name : 'si'},
]

const SeleccionarFecha = () => {

    return(
        <div>
            <FormControl>
                <FormLabel>Seleccionar Fecha</FormLabel>
                <Select placeholder="Seleccione una opcion">
                    {fechas.map((option)=> (
                      <option key={option.id} value={option.name}>
                      {option.name}
                    </option>   
                    ))}
                </Select>
            </FormControl>
        </div>
    )


}

export default SeleccionarFecha