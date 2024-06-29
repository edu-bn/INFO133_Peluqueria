import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const profesionales = [
    {id: 1, name : 'Meruane'},
    {id: 2, name : 'El noctulo'},
    {id: 3, name : 'Pelao Shuster'},
    {id: 4, name : 'Bombo fica'},
    {id: 5, name : 'Martin Alvarado'},
]

const SeleccionarProfesional = () => {

    return(
        <div>
            <FormControl>
                <FormLabel>Seleccionar profesionales</FormLabel>
                <Select placeholder="Seleccione una opcion">
                    {profesionales.map((option)=> (
                      <option key={option.id} value={option.name}>
                      {option.name}
                    </option>   
                    ))}
                </Select>
            </FormControl>
        </div>
    )


}

export default SeleccionarProfesional