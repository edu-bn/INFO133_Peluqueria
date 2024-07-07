import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Reserva from './components/Reserva/Reserva.jsx';
import './App.css'
import Productos from "./components/Productos/Productos.jsx";
import Admin from "./components/Admin/Admin.jsx";
import AdminProductos from "./components/Admin/Productos/AdminProductos.jsx";
import AdminEmpleados from "./components/Admin/Empleados/AdminEmpleados.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/productos" element={<AdminProductos/>}/>
        <Route path="/admin/empleados" element={<AdminEmpleados/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="*" element={<h1>aonde te metiste wons</h1>} />
      </Routes>
    </Router>
  )
}

export default App
