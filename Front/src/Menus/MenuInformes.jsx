import React from 'react'
import Boton from '../components/ui/Boton'

function MenuInformes() {
  return (
    <div>
        <h1>Informes</h1>
        <Boton className='btn btn-primary' text='Informes Biometrias' to='/InformesBiometrias'></Boton>
        <Boton className='btn btn-primary' text='Informes Alimentacion'to='/InformesAlimentacion' ></Boton>
        <Boton className='btn btn-primary' text='Informes Estanques' to='/InformesEstanque'></Boton>
    </div>
  )
}

export default MenuInformes