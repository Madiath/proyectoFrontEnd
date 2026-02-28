import { useId, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const idUsuario = useId();
  const idPassword = useId();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const ingreso = async () => {

    let nomUsuario = usuario;
    let passUsuario = password;

    if (nomUsuario.trim().length === 0 || passUsuario.trim().length === 0) {
      toast.error("Uno de los campos está vacío");
    } 
    else if (
      nomUsuario !== localStorage.getItem("usuario") ||
      passUsuario !== localStorage.getItem("password")
    ) {
      toast.error("Usuario o contraseña incorrectos");
    } 
    else {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: nomUsuario,
          password: passUsuario,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        
        <h2 className="text-center mb-4 text-primary">
           Iniciar Sesión
        </h2>

        <div className="mb-3">
          <label htmlFor={idUsuario} className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id={idUsuario}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor={idPassword} className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id={idPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={ingreso}
          disabled={usuario.trim() === "" || password.trim() === ""}
        >
          Ingresar
        </button>

        <div className="text-center">
          <Link to="/registro" className="text-decoration-none">
            ¿No tiene una cuenta? Registrate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;