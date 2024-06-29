import { useState, useEffect } from "react";
import axios from "axios";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";


const SeleccionarLocal = ({ comunaId, regionId, setLocalSeleccionado}) => {
  const [local, setLocales] = useState([]);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        let url = "http://localhost:3000/api/peluquerias";
        if (comunaId) {
          url = `http://localhost:3000/api/peluquerias/comuna/${comunaId}`;
        } else if (regionId) {
          url = `http://localhost:3000/api/peluquerias/region/${regionId}`;
        } else {
          url = `http://localhost:3000/api/peluquerias`;
        }
        const response = await axios.get(url);
        setLocales(response.data);
      } catch (error) {
        console.error("Error fetching comunas:", error);
      }
    };
    fetchLocales();
  }, [comunaId, regionId]);

  const handleChange = (event) => {
    const selectedLocal = local.find(local => local.id_peluqueria === parseInt(event.target.value));
    setLocalSeleccionado(selectedLocal);
  };

    
  return (
    <div>
      <FormControl>
        <FormLabel>Seleccionar Local</FormLabel>
        <Select placeholder="Seleccione una opción" onChange={handleChange}>
          {local.map((peluqueria) => (
            <option key={peluqueria.id_peluqueria} value={peluqueria.id_peluqueria}>
              {peluqueria.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    )

}

export default SeleccionarLocal