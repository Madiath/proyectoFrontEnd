import { useId, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Registro = () => {

    const idUsuario = useId();
    const idPassword = useId();
    const idPais = useId();

    const refUsuario = useRef();
    const refPassword = useRef();
    const refPais = useRef();




    const navigate = useNavigate();

    const registro = async () => {

        let nomUsuario = refUsuario.current.value;
        let pass = refPassword.current.value;
        let pais = Number(refPais.current.value);
    

        if (nomUsuario.trim().length == 0 || pass.trim().length == 0) {
            toast.error("Uno de los campos esta vacio");
        }
        else {
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
                // Guardamos todo en localStorage
                localStorage.setItem("usuario", nomUsuario);
                localStorage.setItem("password", pass);
                localStorage.setItem("pais", pais);
                localStorage.setItem("token", data.token); // ← token que devuelve la API
                navigate("/home");
            }
            else {
                toast.error("Error al registrarse: " + data.mensaje);
            }
        }


    }




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
          País (ID)
        </label>
        <input
          type="number"
          id={idPais}
          ref={refPais}
          className="form-control"
          placeholder="Ingrese el ID del país"
        />
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

export default Registro