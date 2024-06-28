import { useState } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const local = [
  { id: 1, name: 'ola' },
  { id: 2, name: 'ola21' },
  { id: 3, name: 'fme123' },
  { id: 4, name: 'dje' },
  { id: 5, name: 'op' },
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