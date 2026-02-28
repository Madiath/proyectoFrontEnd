
import { useEffect, useId, useRef } from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate } from "react-router";
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

      <h2 className="text-primary fw-bold mb-4">
        🎬 Agregar Nueva Película
      </h2>

      <div className="mb-3">
        <label htmlFor={idCategoria} className="form-label fw-semibold">
          Categoría (ID)
        </label>
        <input
          type="number"
          id={idCategoria}
          ref={refCategoria}
          className="form-control"
          placeholder="Ingrese el ID de la categoría"
        />
      </div>

      <div className="mb-3">
        <label htmlFor={idNombre} className="form-label fw-semibold">
          Nombre
        </label>
        <input
          type="text"
          id={idNombre}
          ref={refNombre}
          className="form-control"
          placeholder="Ingrese el nombre de la película"
        />
      </div>

      <div className="mb-4">
        <label htmlFor={idFecha} className="form-label fw-semibold">
          Fecha de estreno
        </label>
        <input
          type="date"
          id={idFecha}
          ref={refFecha}
          className="form-control"
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary px-4"
          onClick={agregar}
        >
          Guardar Película
        </button>
      </div>

    </div>

  </div>
);
};

export default AgregarPelicula;