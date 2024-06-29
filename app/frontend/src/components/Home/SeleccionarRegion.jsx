import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const region = [
  { id: 1, name: 'Los rios' },
  { id: 2, name: 'Tarapaca' },
  { id: 3, name: 'Metropolitana' },
  { id: 4, name: 'Los lagos' }
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