import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import Nf from "./pages/Nf";
import Navbar from "./components/NavBar";
import Coches from "./pages/Coches";
import Logeo from "./pages/Logeo";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Alta from "./pages/Alta";
import Alquilar from "./pages/Alquilar";
import Solicitudes from "./pages/Solicitudes";

function App() {
  return (
    <div className="App">
      <div className="encabezado">
        <h1>Bienvenido a InterCars</h1>
      </div>
      <Router>
        <Navbar />
        <div className="contenido-seccion">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/coches" element={<Coches />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/logeo" element={<Logeo />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/alquilar" element={<Alquilar/>}/>
            <Route path="/alta" element={<Alta />} />
            <Route path="*" element={<Nf />} />
            <Route path="/contactos" element={<Navigate to="/contacto" />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
          </Routes>
        </div>
      </Router>
      <footer className="footer">
        <div className="pie">
          <p>© 2023 Alquiler de Coches de Particulares</p>
          <p>Dirección: Calle Lamborguini 1, Monaco, Monaco</p>
        </div>
      </footer>
    </div>
  );
}

export default App;