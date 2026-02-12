import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registro from './Components/Registro'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {

  return (
    
      <BrowserRouter>
      <Routes>
        {/*Crear el dashboard aqui como route que contiene routes hijos (agregar pelicula, info ,etc)*/}
       <Route path="/login" element={<Login />} />
       <Route path="/registro" element={<Registro />} />
       <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
