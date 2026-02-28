import React from 'react'
import CategoriaFavorita from './CategoriaFavorita'
import SituacionPersonal from './SituacionPersonal'
import { Link } from "react-router";
const Informe = () => {
  return (
    <div>

      <h1>INFORME</h1>

      <div className="d-flex justify-content-start mb-3">
        <Link
          to="/home"
          className="btn btn-outline-secondary btn-sm px-3 shadow-sm"
        >
          ← Volver al Panel
        </Link>
      </div>
      <CategoriaFavorita></CategoriaFavorita>
      <SituacionPersonal></SituacionPersonal>
    </div>
  )
}

export default Informe