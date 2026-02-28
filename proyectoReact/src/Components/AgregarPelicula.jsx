import { useEffect, useId, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setPeliculas, guardarPelicula } from "../../features/peliculasSlice";
import { toast } from "react-toastify";

const AgregarPelicula = () => {


  const dispatch = useDispatch();




  const idCategoria = useId();
  const idNombre = useId();
  const idFecha = useId();

  const refCategoria = useRef();
  const refNombre = useRef();
  const refFecha = useRef();

  const navigate = useNavigate();

  const agregar = async () => {

    let categoria = refCategoria.current.value;
    let nombre = refNombre.current.value;
    let fecha = refFecha.current.value;

    // Validar campos vacíos
    if (
      categoria.trim().length === 0 ||
      nombre.trim().length === 0 ||
      fecha.trim().length === 0
    ) {
      toast.error("Uno de los campos está vacío");
      return;
    }

    // Validar que la fecha no sea futura
    const hoy = new Date();
    const fechaIngresada = new Date(fecha);

    if (fechaIngresada > hoy) {
      toast.error("La fecha de estreno no puede ser posterior a hoy");
      return;
    }

    // Crear objeto película
    const nuevaPelicula = {
      idCategoria: categoria,
      nombre: nombre,
      fecha: fechaIngresada
    };

    const response = await fetch("/api/peliculas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
        body: JSON.stringify(nuevaPelicula)
      }
    );

    

    if (!response.ok) {
      const data = await response.json();
      toast.error("Error al agregar película: " + data.mensaje);
    }
    else {
      const data = await response.json();
      nuevaPelicula.fecha = fechaIngresada.toISOString(); // Convertir fecha a formato ISO para almacenar en Redux

      dispatch(guardarPelicula(nuevaPelicula));
      toast.success("Película agregada exitosamente");
    }

  };

  return (
    <div>
      <h1>Agregar Película</h1>

      <label htmlFor={idCategoria}>Categoría (id):</label>
      <input type="number" id={idCategoria} ref={refCategoria} />

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