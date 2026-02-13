import { useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router";

const AgregarPelicula = () => {

  useEffect(() => {
  const obtenerPeliculas = async () => {
    try {
      const response = await fetch("https://movetrack.develotion.com/peliculas",
        {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    //"apikey": "TU_API_KEY_AQUI"
  }
}
      )
      const data = await response.json();
      setPeliculas(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

 console.log(obtenerPeliculas()); 
}, []);




  const idCategoria = useId();
  const idNombre = useId();
  const idFecha = useId();

  const refCategoria = useRef();
  const refNombre = useRef();
  const refFecha = useRef();

  const navigate = useNavigate();

  const agregar = () => {

    let categoria = refCategoria.current.value;
    let nombre = refNombre.current.value;
    let fecha = refFecha.current.value;

    // Validar campos vacíos
    if (
      categoria.trim().length === 0 ||
      nombre.trim().length === 0 ||
      fecha.trim().length === 0
    ) {
      alert("Uno de los campos está vacío");
      return;
    }

    // Validar que la fecha no sea futura
    const hoy = new Date();
    const fechaIngresada = new Date(fecha);

    if (fechaIngresada > hoy) {
      alert("La fecha de estreno no puede ser posterior a hoy");
      return;
    }

    // Crear objeto película
    const nuevaPelicula = {
      id: Date.now(),
      categoria: categoria,
      nombre: nombre,
      fechaEstreno: fecha
    };

    // Obtener lista actual o crear nueva
    let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

    peliculas.push(nuevaPelicula);

    localStorage.setItem("peliculas", JSON.stringify(peliculas));

    alert("Película agregada correctamente");

    navigate("/home");
  };

  return (
    <div>
      <h1>Agregar Película</h1>

      <label htmlFor={idCategoria}>Categoría (id):</label>
      <input type="text" id={idCategoria} ref={refCategoria} />

      <label htmlFor={idNombre}>Nombre:</label>
      <input type="text" id={idNombre} ref={refNombre} />

      <label htmlFor={idFecha}>Fecha de estreno:</label>
      <input type="date" id={idFecha} ref={refFecha} />

      <br /><br />

      <input type="button" value="Guardar" onClick={agregar} />
    </div>
  );
};

export default AgregarPelicula;