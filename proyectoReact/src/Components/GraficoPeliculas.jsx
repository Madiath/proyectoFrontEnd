import {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  setPeliculas,
  setCategorias
} from "../../features/peliculasSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

  

const GraficoPeliculas = () => {



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

  const conteoCategorias = {};

  peliculas.forEach(peli => {
    const categoria = categorias.find(c => c.id === peli.idCategoria);

    if (categoria) {
      if (!conteoCategorias[categoria.nombre]) {
        conteoCategorias[categoria.nombre] = 0;
      }
      conteoCategorias[categoria.nombre]++;
    }
  });

  const labels = Object.keys(conteoCategorias);
  const valores = Object.values(conteoCategorias);

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad de Películas",
        data: valores,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Películas por Categoría",
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de Películas</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficoPeliculas;