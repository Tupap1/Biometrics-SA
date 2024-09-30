import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entrar from './components/login.jsx'
import './components/styles/index.css'
import App from './App.jsx' 
import Formulario from './RegistrarDatosdeBiometria.jsx'
import Biometria from './ResgisterBiometrias.jsx'
import Menu from './SideBarMenu.tsx'
import FcAdvertising from 'react-icons/fc'

import React from 'react'

export default function hola() {
  return (
    <div>hola</div>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menu />
  </StrictMode>,
)
