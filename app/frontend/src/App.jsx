import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home.jsx';
import Reserva from './components/Reserva.jsx';
import './App.css'
import Productos from "./components/Productos.jsx";


function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="*" element={<h1>aonde te metiste wons</h1>} />
      </Routes>
    </Router>
  )
}

export default App
