import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const region = [
  { id: 1, name: 'ola' },
  { id: 2, name: 'ola21' },
  { id: 3, name: 'fme123' },
  { id: 4, name: 'dje' },
  { id: 5, name: 'op' },
]

const SeleccionarRegion = () => {
    
  return (
    <div>
      <FormControl>
        <FormLabel>Seleccionar Region</FormLabel>
        <Select placeholder="Seleccione una opción">
          {region.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarRegion