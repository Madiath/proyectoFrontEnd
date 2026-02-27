import { useSelector } from "react-redux";

const SituacionPersonal = () => {

  const peliculas = useSelector(state => state.peliculas.todasPeliculas);
  const categorias = useSelector(state => state.peliculas.categorias);

  const idComedia = categorias.find(c => c.nombre === "Comedia")?.id;
  const idDrama = categorias.find(c => c.nombre === "Drama")?.id;

  const cantidadComedia = peliculas.filter(
    peli => peli.idCategoria === idComedia
  ).length;

  const cantidadDrama = peliculas.filter(
    peli => peli.idCategoria === idDrama
  ).length;

  let emoji = "😐";

  if (cantidadComedia > cantidadDrama) {
    emoji = "😄";
  } else if (cantidadDrama > cantidadComedia) {
    emoji = "😢";
  }

  return (
    <div>
      <h2>Estado del Usuario</h2>
      <div style={{ fontSize: "60px" }}>
        {emoji}
      </div>
      <p>
        Comedia: {cantidadComedia} | Drama: {cantidadDrama}
      </p>
    </div>
  );
};

export default SituacionPersonal;