import { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, FormControl, FormLabel } from "@chakra-ui/react";


const SeleccionarRegion = ({ setRegionSeleccionada }) => {
  const [regiones, setRegiones] = useState([]);

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/regiones");
        setRegiones(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegiones();
  }, []);

  const handleChange = (event) => {
    const selectedRegion = regiones.find(region => region.id_region === parseInt(event.target.value));
    setRegionSeleccionada(selectedRegion);
  };
    
  return (
    <div>
      <FormControl>
        <FormLabel>Seleccionar Region</FormLabel>
        <Select placeholder="Seleccione una opción" onChange={handleChange}>
          {regiones.map((region) => (
            <option key={region.id_region} value={region.id_region}>
              {region.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarRegion