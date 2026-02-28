import React from 'react'
import { NavLink, Outlet } from 'react-router'

const TablaOpciones = () => {
  return (
    <div className="row">

      {/* MENU DE OPCIONES */}
      <div className="col-md-12">
        <div className="list-group shadow">

          <NavLink
            to={"/AgregarPelicula"}
            className={({ isActive }) =>
              "list-group-item list-group-item-action fs-5 fw-bold py-3 " +
              (isActive ? "active bg-primary border-primary" : "")
            }
          >
            🎬 Agregar Película
          </NavLink>

          <NavLink
            to={"/Registros"}
            className={({ isActive }) =>
              "list-group-item list-group-item-action fs-5 fw-bold py-3 " +
              (isActive ? "active bg-success border-success" : "")
            }
          >
            📄 Registros
          </NavLink>

          <NavLink
            to={"/Informe"}
            className={({ isActive }) =>
              "list-group-item list-group-item-action fs-5 fw-bold py-3 " +
              (isActive ? "active bg-warning border-warning text-dark" : "")
            }
          >
            📊 Informe
          </NavLink>

          <NavLink
            to={"/Analisis"}
            className={({ isActive }) =>
              "list-group-item list-group-item-action fs-5 fw-bold py-3 " +
              (isActive ? "active bg-danger border-danger" : "")
            }
          >
            📈 Análisis
          </NavLink>

        </div>
      </div>

      {/* CONTENIDO */}
      
        <div >
          <Outlet />
        </div>
    

    </div>
  )
}

export default TablaOpciones