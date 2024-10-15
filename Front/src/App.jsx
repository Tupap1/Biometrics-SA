import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./components/styles/index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./Inicio.tsx";
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import React, { useState } from "react";
import Biometria from "./Biometrias/Biometria.jsx";
import MenuInicio from "./Menus/MenuInicio.jsx";
import MenuBiometrias from "./Menus/MenuBiometrias.jsx";
import VerBiometria from "./Biometrias/VerBiometria.jsx";
import MenuWQ from "./Menus/MenuWQ.jsx";
import WQ from "./WQ/WQ.jsx";
import VerWQ from "./WQ/VerWQ.jsx";
import MenuEstanques from "./Menus/MenuEstanques.jsx";
import RegistrarEstanque from "./Estanques/RegistrarEstanque.jsx";
import VerEstanques from "./Estanques/VerEstanques.jsx";
 
function App() {
  return (
    <div className="row">
    <div className="col"><Inicio /></div>
    
    <BrowserRouter>
      <div className="col-9">
        <Routes>
          <Route path="/" element={<MenuInicio />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Biometria" element={<Biometria />} />
          <Route path="/MenuBiometria" element={<MenuBiometrias />} />
          <Route path="/VerBiometria" element={<VerBiometria />} />
          <Route path="/MenuWQ" element={<MenuWQ />} />
          <Route path="/WQ" element={<WQ />} />
          <Route path="/VerWQ" element={<VerWQ />} />
          <Route path="/MenuEstanques" element={<MenuEstanques />} />
          <Route path="/RegistrarEstanques" element={<RegistrarEstanque />} />
          <Route path="/VerEstanques" element={<VerEstanques />} />
          
          
          
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}
   
export default App;