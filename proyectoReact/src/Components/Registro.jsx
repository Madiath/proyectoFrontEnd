import { useEffect, useId, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPaises } from "../../features/peliculasSlice";

const Registro = () => {

  const dispatch = useDispatch();
  const paises = useSelector(state => state.peliculas.paises);

  const idUsuario = useId();
  const idPassword = useId();
  const idPais = useId();

  const refUsuario = useRef();
  const refPassword = useRef();
  const refPais = useRef();

  const navigate = useNavigate();

  useEffect(() => {

    const obtenerPaises = async () => {
      try {
        const response = await fetch("/api/paises");

        if (!response.ok) {
          toast.error("Error al obtener países");
          return;
        }

        const data = await response.json();

        dispatch(setPaises(data.paises));

      } catch (error) {
        console.error(error);
        toast.error("Error inesperado");
      }
    };

    obtenerPaises();

  }, [dispatch]);

  const registro = async () => {

    let nomUsuario = refUsuario.current.value;
    let pass = refPassword.current.value;
    let pais = parseInt(refPais.current.value);

    if (
      nomUsuario.trim().length === 0 ||
      pass.trim().length === 0 ||
      isNaN(pais)
    ) {
      toast.error("Uno de los campos está vacío");
      return;
    }

    try {

      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: nomUsuario,
          password: pass,
          idPais: pais
        })
      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("usuario", nomUsuario);
        localStorage.setItem("password", pass);
        localStorage.setItem("pais", pais);
        localStorage.setItem("token", data.token);

        toast.success("Registro exitoso");

        navigate("/home");

      } else {

        toast.error("Error al registrarse: " + data.mensaje);

      }

    } catch (error) {

      console.error(error);
      toast.error("Error inesperado");

    }

  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card shadow-lg border-0 p-5" style={{ width: "400px" }}>

        <h2 className="text-primary fw-bold text-center mb-4">
          📝 Crear Cuenta
        </h2>

        <div className="mb-3">
          <label htmlFor={idUsuario} className="form-label fw-semibold">
            Usuario
          </label>
          <input
            type="text"
            id={idUsuario}
            ref={refUsuario}
            className="form-control"
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor={idPassword} className="form-label fw-semibold">
            Contraseña
          </label>
          <input
            type="password"
            id={idPassword}
            ref={refPassword}
            className="form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>

        <div className="mb-4">
          <label htmlFor={idPais} className="form-label fw-semibold">
            País
          </label>

          <select
            id={idPais}
            ref={refPais}
            className="form-select"
          >

            <option value="">
              Seleccione un país
            </option>

            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.nombre}
              </option>
            ))}

          </select>

        </div>

        <div className="d-grid mb-3">
          <button
            className="btn btn-primary py-2"
            onClick={registro}
          >
            Registrarse
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-decoration-none text-secondary small"
          >
            ¿Ya estás registrado? Ingresá a tu cuenta
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Registro;