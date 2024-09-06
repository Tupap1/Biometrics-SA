import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entrar from './components/login.jsx'
import './index.css'
import App from './App.jsx'
import Register from './ResgisterBiometrias.jsx'
import Formulario from './RegistrarDatosdeBiometria.jsx'
import Biometria from './Biometria.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Biometria/>
  </StrictMode>,
)
