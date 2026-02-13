import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'

const TablaOpciones = () => {
  return (
    <div>
<header>
    <nav>
          <NavLink to={"/AgregarPelicula"}>AGREGAR PELICULA</NavLink>||
          <NavLink to={"/Registros"}>REGISTROS</NavLink>||
          <NavLink to={"/Informe"}>INFORME</NavLink>||
          <NavLink to={"/Analisis"}>ANALISIS</NavLink>
        </nav>
  
    </header>
<main>
    <Outlet></Outlet>
</main>
    </div>
    
     )
}

export default TablaOpciones