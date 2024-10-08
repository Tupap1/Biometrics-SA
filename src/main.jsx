import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './components/styles/index.css'
import App from './App.jsx' 
import Formulario from './RegistrarDatosdeBiometria.jsx'
import Biometria from './ResgisterBiometrias.jsx'
import Boton from './components/ui/Boton.tsx'
import Form from './components/ui/Form.tsx'
import SideBar from './components/ui/SideBar.tsx'
import Menu from './Menu.tsx'

import React from 'react'
import RegisterPage from './RegisterPage.jsx'
import Biometrias from './Biometrias.tsx'
import Estanques from './Estanques.tsx'
import WQ from './WQ.tsx'
import Estanquesver from './Estanquesver.tsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SideBar/>
  </StrictMode>
)
