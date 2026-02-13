import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registro from './Components/Registro'
import Login from './Components/Login'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import TablaOpciones from './Components/TablaOpciones'
import Informe from './Components/Informe'
import AgregarPelicula from './Components/AgregarPelicula'
import Registros from './Components/Registros'
import Analisis from './Components/Analisis'
import { store } from '../store/store'

function App() {

  return (
    
      <BrowserRouter>
      <Provider store={store}>
      <Routes>
        
       <Route path="/" element={<Login />} />
       <Route path="/registro" element={<Registro />} />

      {/*Crear el dashboard aqui como route que contiene routes hijos (agregar pelicula, info ,etc)*/}
      {/*Rutas protejidas*/}
      <Route element={<ProtectedRoute/>}>
      <Route element={<TablaOpciones/>} >
      
      <Route path="/home" element={<Home/>} />
      <Route path="/informe" element={<Informe/>}/>
      <Route path="/agregarPelicula" element={<AgregarPelicula/>}/>
      <Route path="/registros" element={<Registros/>}/>
      <Route path="/analisis" element={<Analisis/>}/>
      </Route>
      </Route>

      
      </Routes>
      </Provider>
      </BrowserRouter>
    
  )
}

export default App
