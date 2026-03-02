import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPeliculas,
  setCategorias,
  eliminarPelicula,
  filtrarPorFecha,
  limpiarFiltro
} from "../../features/peliculasSlice";
import { Link } from "react-router";

const Registros = () => {

  const dispatch = useDispatch();
  const peliculas = useSelector(state => state.peliculas.peliculasFiltradas);
  const categorias = useSelector(state => state.peliculas.categorias);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {

    const obtenerPeliculas = async () => {
      try {
        const response = await fetch("/api/peliculas", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });

        if (!response.ok) {
          alert("Error al obtener películas");
          return;
        }

        const data = await response.json();

        console.log(data.peliculas);
        dispatch(setPeliculas(data.peliculas));

      } catch (error) {
        console.error(error);
        alert("Error inesperado");
      }
    };

    obtenerPeliculas();
  }, [dispatch]);

  const borrarPelicula = async (id) => {
    try {
      const response = await fetch(`/api/peliculas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        alert("Error al eliminar la película");
        return;
      }

      dispatch(eliminarPelicula(id));

    } catch (error) {
      console.error(error);
      alert("Error inesperado");
    }
  };

  //  FILTRAR
  const manejarFiltrado = (e) => {
    e.preventDefault();

    if (!fechaFiltro) {
      dispatch(limpiarFiltro());
      return;
    }

    dispatch(filtrarPorFecha(fechaFiltro));
  };


  useEffect(() => {
  const obtenerCategorias = async () => {
    try {
      const response = await fetch("/api/categorias", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        console.log("Error al obtener categorías");
        return;
      }

      const data = await response.json();
      console.log(data.categorias);
      dispatch(setCategorias(data.categorias));

    } catch (error) {
      console.error(error);
    }
  };

  obtenerCategorias();
}, []);

const obtenerEmojiCategoria = (categoriaId) => {
  const categoria = categorias.find(c => c.id === categoriaId);
  return categoria ? categoria.emoji : "Sin categoría";
};



  return (
  <div className="container mt-4">

<div className="d-flex justify-content-start mb-3">
  <Link 
    to="/home" 
    className="btn btn-outline-secondary btn-sm px-3 shadow-sm"
  >
    ← Volver al Panel
  </Link>
</div>


    <div className="card shadow-lg border-0 p-4">

      <h2 className="text-success fw-bold mb-4">
        📄 Listado de Películas
      </h2>

      {/* FILTRO */}
      <form 
        onSubmit={manejarFiltrado}
        className="row g-3 align-items-end mb-4"
      >
        <div className="col-md-4">
          <label className="form-label fw-semibold">
            Filtrar por fecha
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
        </div>

        <div className="col-md-auto">
          <button type="submit" className="btn btn-success">
            Filtrar
          </button>
        </div>

        <div className="col-md-auto">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFechaFiltro("");
              dispatch(limpiarFiltro());
            }}
          >
            Limpiar
          </button>
        </div>
      </form>

      {/* TABLA */}
      {peliculas.length === 0 ? (
        <div className="alert alert-info">
          No hay películas cargadas
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Fecha Estreno</th>
                <th>Categoría</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peliculas.map((peli) => (
                <tr key={peli.id}>
                  <td className="fw-semibold">
                    {peli.nombre}
                  </td>
                  <td>
                    {new Date(peli.fechaEstreno + "T00:00:00").toLocaleDateString()}
                  </td>
                  <td>
                    {obtenerEmojiCategoria(peli.idCategoria)}
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => borrarPelicula(peli.id)}
                      className="btn btn-sm btn-danger"
                    >
                      🗑 Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  </div>
);
};

export default Registros;
