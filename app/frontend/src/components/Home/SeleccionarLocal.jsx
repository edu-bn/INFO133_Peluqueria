import { useState } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const local = [
  { id: 1, name: 'local_1', id_comuna: 1 },
    { id: 2, name: 'local_2', id_comuna: 2 },
    { id: 3, name: 'local_3', id_comuna: 3 },
    { id: 4, name: 'local_4', id_comuna: 4 } 
]

const SeleccionarLocal = ({setLocalSeleccionado}) => {
    const handleLocalChange = (event) => {
        const localSeleccionado = event.target.value;
        setLocalSeleccionado(localSeleccionado);
    }
    
  return (
    <div>
      <FormControl>
        <FormLabel>Seleccionar Local</FormLabel>
        <Select placeholder="Seleccione una opción" onChange={handleLocalChange}>
          {local.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarLocal