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

  

const GraficoPorcentaje = () => {



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

  let mayores12 = 0;
  let restoPublico = 0;

  peliculas.forEach(peli => {

    const categoria = categorias.find(c => c.id === peli.idCategoria);

    if (categoria) {
      if (categoria.edad_requerida >= 12) {
        mayores12++;
      } else {
        restoPublico++;
      }
    }
  });

  const total = mayores12 + restoPublico;

  const porcentajeMayores12 = total > 0
    ? ((mayores12 / total) * 100).toFixed(1)
    : 0;

  const porcentajeResto = total > 0
    ? ((restoPublico / total) * 100).toFixed(1)
    : 0;

  const data = {
    labels: [
      `Mayores de 12 (${porcentajeMayores12}%)`,
      `Resto del público (${porcentajeResto}%)`
    ],
    datasets: [
      {
        data: [porcentajeMayores12, porcentajeResto],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)"
        ],
        borderWidth: 1,
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
      <h2>Porcentaje por Tipo</h2>
     <Bar options={options} data={data} />
    </div>
  );
};

export default GraficoPorcentaje;