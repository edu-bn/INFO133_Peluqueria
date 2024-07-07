import { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

const SeleccionarComuna = ({ regionId, setComunaSeleccionada}) => {
  const [comuna, setComunas] = useState([]);

  
  useEffect(() => {
    const fetchComunas = async () => {
      try {
        let response;
        if (regionId) {
          response = await axios.get(`http://localhost:3000/api/comunas/region/${regionId}`);
        } else {
          response = await axios.get(`http://localhost:3000/api/comunas`);
        }
        setComunas(response.data);
      } catch (error) {
        console.error("Error fetching comunas:", error);
      }
    };

    fetchComunas();
  }, [regionId]);

  const handleChange = (event) => {
    const selectedComuna = comuna.find(comuna => comuna.id_comuna === parseInt(event.target.value));
    setComunaSeleccionada(selectedComuna);
  };

  return (
    <div>
      <FormControl>
        <FormLabel>2. Seleccionar Comuna</FormLabel>
        <Select placeholder="Seleccione una opción" onChange={handleChange}>
          {comuna.map((comuna) => (
            <option key={comuna.id_comuna} value={comuna.id_comuna}>
              {comuna.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarComuna