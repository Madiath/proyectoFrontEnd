
import { useId, useRef } from "react";
import {Link, useNavigate } from "react-router";

const Registro = () => {

    const idUsuario = useId();
    const idPassword = useId();
    const idPais = useId();
    
    const refUsuario = useRef();
    const refPassword = useRef();
    const refPais = useRef();
   
    const navigate = useNavigate();

    const registro = () =>{
        let nomUsuario = refUsuario.current.value;
        let password = refPassword.current.value;
        let pais = refPais.current.value;
        
    
        
        //Verificamos que los datos no esten vacios
        if(nomUsuario.trim().length == 0  || password.trim().length == 0 || pais.trim().length == 0){
            alert("Uno de los campos esta vacio");
        }
        else{
            //Creamos usuario y creamos token
            localStorage.setItem("usuario", nomUsuario);
            localStorage.setItem("password", password);
            localStorage.setItem("pais", pais);
            //localStorage.setItem("token", ---);
            navigate("/home");
        }

    

        
    }




  return (
    <div>
        <h1>Registro</h1>
        <label htmlFor={idUsuario}>Nombre:</label>
            <input type="text" id={idUsuario} ref={refUsuario}/>
            <label htmlFor={idPassword } >Password:</label>
            <input type="text" id={idPassword} ref={refPassword}/>
            <label htmlFor={idPais}>Pais:</label>
            <input type="text" id={idPais} ref={refPais}/>
            <input type="button" value="Ingresar" onClick={registro} />
            <br/>
            <Link to="/login">¿Estas registrado? Ingresa tu cuenta</Link>
    </div>
  )
}

export default Registro