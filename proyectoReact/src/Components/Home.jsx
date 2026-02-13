import { NavLink } from "react-router"
import TablaOpciones from "./TablaOpciones"


const Home = () => {
  return (
    <div>
        <h1>HOME</h1>
        <h2>Bienvenido {localStorage.getItem("usuario")}</h2>
    </div>
  )
}

export default Home