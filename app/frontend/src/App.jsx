import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Reserva from './components/Reserva/Reserva.jsx';
import './App.css'
import Productos from "./components/Productos/Productos.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/carro" element={<h1>carro</h1>}/>
        <Route path="*" element={<h1>aonde te metiste wons</h1>} />
      </Routes>
    </Router>
  )
}

export default App
