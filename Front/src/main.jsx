import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/index.css'
import App from './App.jsx' 
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Formulario from './RegistrarDatosdeBiometria.jsx'
import Boton from './components/ui/Boton.tsx'
import Form from './components/ui/Form.tsx'
import Inicio from './Inicio.tsx'
import LandingPage from './LandingPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import React, { useState } from 'react'
import Biometria from './Biometria.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <Routes>

            <Route  path="/" element={<Inicio />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Biometria" element={<Biometria />} />
            
    </Routes>
  
    </BrowserRouter>  
  </StrictMode>
)
