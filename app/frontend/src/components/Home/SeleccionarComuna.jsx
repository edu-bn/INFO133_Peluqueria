import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const comuna = [
    { id: 1, name: 'valdivia', id_region: 1 },
    { id: 2, name: 'iquique', id_region: 2 },
    { id: 3, name: 'santiago', id_region: 3 },
    { id: 4, name: 'puerto montt', id_region: 4 }
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