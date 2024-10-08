import React from 'react'
import SideBar from './components/ui/SideBar'
import Boton from './components/ui/Boton'
import Form from './components/ui/Form'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function Menu() {

const [mostrarForm, setmostrarForm] = useState(false);

  return (<div>
    <SideBar/>
    {!mostrarForm && (
          <nav>
            <Link to="/form1">Formulario 1</Link>
            <Link to="/form2">Formulario 2</Link>
          </nav>
        )} 
    <Boton text='Registrar Biometria'/>
    <Boton text='Registro WQ' to='/menu'/>
    <Boton text='Registrar estanque'/>
    </div>
  )
}

export default Menu