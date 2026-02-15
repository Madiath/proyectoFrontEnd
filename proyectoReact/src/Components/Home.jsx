import { NavLink, useNavigate } from "react-router"
import TablaOpciones from "./TablaOpciones"


const Home = () => {

const navigate = useNavigate();

const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
}



  return (
    <div>
        <h1>HOME</h1>
        <h2>Bienvenido {localStorage.getItem("usuario")}</h2>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  )
}

export default Home