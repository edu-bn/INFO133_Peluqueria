import ListaProductos from "./ListaProductos.jsx";
import Top from "../Top.jsx";

const Productos = () => {
    return (
      <div>
        <Top text={'Productos'}></Top>
        
        <ListaProductos />
      </div>
    );
  };
  
  export default Productos;
  