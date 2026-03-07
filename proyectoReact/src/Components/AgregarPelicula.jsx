import { useEffect, useId, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { guardarPelicula, setCategorias } from "../../features/peliculasSlice";
import { toast } from "react-toastify";

const AgregarPelicula = () => {

  const dispatch = useDispatch();
  const categorias = useSelector(state => state.peliculas.categorias);

  const idCategoria = useId();
  const idNombre = useId();
  const idFecha = useId();

  const refCategoria = useRef();
  const refNombre = useRef();
  const refFecha = useRef();

  // Obtener categorías al cargar
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
          toast.error("Error al obtener categorías");
          return;
        }

        const data = await response.json();

        dispatch(setCategorias(data.categorias));

      } catch (error) {
        console.error(error);
        toast.error("Error inesperado");
      }
    };

    obtenerCategorias();

  }, [dispatch]);

  const agregar = async () => {

    let categoria = parseInt(refCategoria.current.value);
    let nombre = refNombre.current.value;
    let fecha = refFecha.current.value;

    if (
      isNaN(categoria) ||
      nombre.trim().length === 0 ||
      fecha.trim().length === 0
    ) {
      toast.error("Uno de los campos está vacío");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];

    if (fecha > hoy) {
      toast.error("La fecha de estreno no puede ser posterior a hoy");
      return;
    }

    const nuevaPelicula = {
      idCategoria: categoria,
      nombre: nombre,
      fechaEstreno: fecha
    };

    try {

      const response = await fetch("/api/peliculas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(nuevaPelicula)
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Error al agregar película: " + data.mensaje);
      }
      else {

        dispatch(guardarPelicula(nuevaPelicula));

        toast.success("Película agregada exitosamente");

      }

    } catch (error) {

      console.error(error);
      toast.error("Error inesperado");

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

        {/* SELECT DE CATEGORÍAS */}
        <div className="mb-3">
          <label htmlFor={idCategoria} className="form-label fw-semibold">
            Categoría
          </label>

          <select
            id={idCategoria}
            ref={refCategoria}
            className="form-select"
          >

            <option value="">
              Seleccione una categoría
            </option>

            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}

          </select>
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