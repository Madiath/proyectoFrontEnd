import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPeliculas,
  setCategorias
} from "../../features/peliculasSlice";




const SituacionPersonal = () => {

  const dispatch = useDispatch();


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




  const peliculas = useSelector(state => state.peliculas.todasPeliculas);
  const categorias = useSelector(state => state.peliculas.categorias);

  const idComedia = categorias.find(c => c.nombre === "Comedia")?.id;
  const idDrama = categorias.find(c => c.nombre === "Drama")?.id;

  const emojiComedia = categorias.find(c => c.nombre === "Comedia")?.emoji;
  const emojiDrama = categorias.find(c => c.nombre === "Drama")?.emoji;



  const cantidadComedia = peliculas.filter(
    peli => peli.idCategoria === idComedia
  ).length;

  const cantidadDrama = peliculas.filter(
    peli => peli.idCategoria === idDrama
  ).length;

  let emoji = "";

  if (cantidadComedia > cantidadDrama) {
    emoji = emojiComedia;
  } else if (cantidadDrama > cantidadComedia) {
    emoji = emojiDrama;
  }

  return (
  <div className="container mt-4">

    <div className="card shadow-lg border-0 p-5 text-center">

      <h2 className="text-info fw-bold mb-4">
        🎭 Situación Personal
      </h2>

      {peliculas.length === 0 ? (
        <div className="alert alert-secondary">
          No hay datos suficientes para analizar tu situación.
        </div>
      ) : (
        <>
          <div className="display-1 mb-4">
            {emoji || "🤔"}
          </div>

          <div className="row justify-content-center mt-3">

            <div className="col-md-4">
              <div className="card bg-light border-0 shadow-sm p-3">
                <h5 className="text-success fw-bold">
                  {emojiComedia} Comedia
                </h5>
                <p className="fs-4 mb-0">
                  {cantidadComedia}
                </p>
              </div>
            </div>

            <div className="col-md-4 mt-3 mt-md-0">
              <div className="card bg-light border-0 shadow-sm p-3">
                <h5 className="text-danger fw-bold">
                  {emojiDrama} Drama
                </h5>
                <p className="fs-4 mb-0">
                  {cantidadDrama}
                </p>
              </div>
            </div>

          </div>

          <p className="text-muted mt-4">
            Tu estado actual está basado en la cantidad de películas registradas por categoría.
          </p>
        </>
      )}

    </div>

  </div>
);
};

export default SituacionPersonal;