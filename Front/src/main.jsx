import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./components/styles/index.css";
import App from "./App.jsx";
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




createRoot(document.getElementById("root")).render(
  <StrictMode>
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
            
          </Routes>
        </div>
      </BrowserRouter> 
  
    </div>
  </StrictMode>
);
