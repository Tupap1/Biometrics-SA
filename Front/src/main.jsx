import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/index.css'
import App from './App.jsx' 
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Formulario from './RegistrarDatosdeBiometria.jsx'
import Biometria from './ResgisterBiometrias.jsx'
import Boton from './components/ui/Boton.tsx'
import Form from './components/ui/Form.tsx'
import Menu from './Menu.tsx'
import LandingPage from './LandingPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import React, { useState } from 'react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menu" element={<Biometria />} />
    </Routes>
    <Menu/>
    </BrowserRouter>  
  </StrictMode>
)
