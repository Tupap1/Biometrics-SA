import React from 'react'
import SideBar from './components/ui/SideBar'
import Boton from './components/ui/Boton'
import Form from './components/ui/Form'



function Estanques() {
  return (
    <div>
<SideBar/>
<Boton text='Registrar Estanques'/>
<Boton text='Ver Estanques'/>

    </div>
  )
}

export default Estanques