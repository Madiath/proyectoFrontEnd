import React from 'react'
import GraficoPeliculas from './GraficoPeliculas'
import GraficoPorcentaje from './GraficoPorcentaje'
import { Link } from "react-router";
const Analisis = () => {
  return (
    <div>
      <h1>Analisis</h1>
      <div className="d-flex justify-content-start mb-3">
        <Link
          to="/home"
          className="btn btn-outline-secondary btn-sm px-3 shadow-sm"
        >
          ← Volver al Panel
        </Link>
      </div>
      <GraficoPeliculas />
      <GraficoPorcentaje />
    </div>
  )
}

export default Analisis