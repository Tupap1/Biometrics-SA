import React from 'react'
import SideBar from './components/ui/SideBar'
import Boton from './components/ui/Boton'
import Form from './components/ui/Form'

function Menu() {
  return (<div>
    <SideBar/>
    <Boton text='Registrar Biometria'/>
    <Boton text='Registro WQ'/>
    <Boton text='Registrar estanque'/>
    </div>
  )
}

export default Menu