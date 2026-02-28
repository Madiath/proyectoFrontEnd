import { useNavigate } from "react-router";
import TablaOpciones from "./TablaOpciones";

const Home = () => {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  const usuario = localStorage.getItem("usuario");

  return (
    <div className="container-fluid min-vh-100 bg-light">

      {/* HEADER */}
      <div className="p-4 shadow-sm bg-white">

        <div className="d-flex justify-content-between align-items-start ">

          {/* TITULO + USUARIO */}
          <div>
            <h2 className="text-primary fw-bold">
              🎬 Bienvenido a Películas
            </h2>

            <p className="text-muted fs-5 mt-2 mb-0">
              Usuario: <span className="fw-semibold text-dark">{usuario}</span>
            </p>
          </div>


          {/* BOTON MÁS SEPARADO */}
          <div className="ms-5">
            <button
              className="btn btn-outline-danger px-4"
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </button>
          </div>

        </div>

      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-5">

        <div className="card shadow-lg p-5 border-0">

          <h3 className="text-center mb-5 text-secondary">
            Opciones Disponibles
          </h3>

          <TablaOpciones />

        </div>

      </div>

    </div>
  );
};

export default Home;