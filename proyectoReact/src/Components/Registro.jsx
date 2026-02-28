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
        <div>
            <h1>Registro</h1>
            <label htmlFor={idUsuario}>Nombre:</label>
            <input type="text" id={idUsuario} ref={refUsuario} />
            <label htmlFor={idPassword} >Password:</label>
            <input type="text" id={idPassword} ref={refPassword} />
            <label htmlFor={idPais}>Pais:</label>
            <input type="number" id={idPais} ref={refPais} />
            <input type="button" value="Ingresar" onClick={registro} />
            <br />
            <Link to="/">¿Estas registrado? Ingresa tu cuenta</Link>
        </div>
    )
}

export default Registro