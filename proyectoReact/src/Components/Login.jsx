import { useId, useRef, useState } from "react";
import {Link, useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();

    const idUsuario = useId();
    const idPassword = useId();

    //Tomamos los datos del Usuario
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    


       const ingreso = () =>{
      
        let nomUsuario = usuario;
        let passUsuario = password;
         
        
        //Verificamos que los datos no esten vacios
        if(nomUsuario.trim().length == 0  || passUsuario.trim().length == 0 ){
            alert("Uno de los campos esta vacio");

        //Verificamos que el USUARIO exista 
        }else if(nomUsuario != localStorage.getItem("usuario") || passUsuario != localStorage.getItem("password")){
            alert("Usuario o contraseña incorrectos");

        }else{
            //Creamos token
            //localStorage.setItem("token", ---);
            navigate("/home");
        }
        
    }
   

    return (
    <div>
      <h1>LOGIN</h1>

      <label htmlFor={idUsuario}>Nombre:</label>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        id={idUsuario}
      />

      <label htmlFor={idPassword}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         id={idPassword}
      />

      <input
        type="button"
        value="Ingresar"
        onClick={ingreso}
        disabled={usuario.trim() === "" || password.trim() === ""}
      />

      <br />
      <Link to="/registro">¿No tiene una cuenta? Registrate</Link>
    </div>
  );
}

export default Login