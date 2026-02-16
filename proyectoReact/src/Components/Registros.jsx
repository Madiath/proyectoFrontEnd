import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPeliculas,
  setCategorias,
  eliminarPelicula,
  filtrarPorFecha,
  limpiarFiltro
} from "../../features/peliculasSlice";

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
    <div>
      <h1>Listado de Películas</h1>

      {/* FORM FILTRO */}
      <form onSubmit={manejarFiltrado}>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />

        <button type="submit">
          Filtrar
        </button>

        <button
          type="button"
          onClick={() => {
            setFechaFiltro("");
            dispatch(limpiarFiltro());
          }}
        >
          Limpiar
        </button>
      </form>

      <hr />

      {peliculas.length === 0 ? (
        <p>No hay películas cargadas</p>
      ) : (
        <ul>
          {peliculas.map((peli) => (
            <li key={peli.id}>
              {peli.nombre} - {peli.fechaEstreno} - {obtenerEmojiCategoria(peli.idCategoria)}

              <button
                onClick={() => borrarPelicula(peli.id)}
                style={{ marginLeft: "10px" }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Registros;
