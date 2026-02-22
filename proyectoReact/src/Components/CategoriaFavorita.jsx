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
    return <p>No hay categoría favorita</p>;
  }

  return (
    <div>
      <h2>Categoría Favorita</h2>
       
        <p>{categoriaFavorita.emoji}</p>
        
      <p>{categoriaFavorita.nombre}</p>
    </div>
  );
};

export default CategoriaFavorita;