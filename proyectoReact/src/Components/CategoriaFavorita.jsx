import { useMemo } from "react";
import { useSelector } from "react-redux";

const CategoriaFavorita = () => {

  const peliculas = useSelector(
    state => state.peliculas.todasPeliculas
  );

  const categorias = useSelector(
    state => state.peliculas.categorias
  );

  
  const categoriaFavorita = useMemo(() => {

    if (!peliculas || peliculas.length === 0) return null;

  
    const conteo = peliculas.reduce((acc, peli) => {
      acc[peli.idCategoria] = (acc[peli.idCategoria] || 0) + 1;
      return acc;
    }, {});

    
    const max = Math.max(...Object.values(conteo));

    
    const idFavorito = Number(
      Object.keys(conteo).find(id => conteo[id] === max)
    );

    
    return categorias.find(c => c.id === idFavorito);

  }, [peliculas, categorias]);

 if (!categoriaFavorita) {
  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 p-4 text-center">
        <h2 className="text-warning fw-bold mb-3">
          ⭐ Categoría Favorita
        </h2>

        <div className="alert alert-info">
          No hay películas suficientes para determinar una categoría favorita.
        </div>
      </div>
    </div>
  );
}

return (
  <div className="container mt-4">

    <div className="card shadow-lg border-0 p-5 text-center">

      <h2 className="text-warning fw-bold mb-4">
        ⭐ Categoría Favorita
      </h2>

      <div className="display-1 mb-3">
        {categoriaFavorita.emoji}
      </div>

      <h3 className="fw-bold text-dark">
        {categoriaFavorita.nombre}
      </h3>

      <p className="text-muted mt-3">
        Es la categoría con mayor cantidad de películas registradas.
      </p>

    </div>

  </div>
);
};

export default CategoriaFavorita;