import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const comuna = [
  { id: 1, name: 'ola' },
  { id: 2, name: 'ola21' },
  { id: 3, name: 'fme123' },
  { id: 4, name: 'dje' },
  { id: 5, name: 'op' },
]

const SeleccionarComuna = () => {
    
  return (
    <div>
      <FormControl>
        <FormLabel>Seleccionar Comuna</FormLabel>
        <Select placeholder="Seleccione una opción">
          {comuna.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarComuna