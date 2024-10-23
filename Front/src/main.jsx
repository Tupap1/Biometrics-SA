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
import MenuWQ from "./Menus/MenuWQ.jsx";
import WQ from "./WQ/WQ.jsx";
import VerWQ from "./WQ/VerWQ.jsx";
import MenuEstanques from "./Menus/MenuEstanques.jsx";
import RegistrarEstanque from "./Estanques/RegistrarEstanque.jsx";
import VerEstanques from "./Estanques/VerEstanques.jsx";
import CrearPeces from "./Peces/CrearPeces.jsx";
import Estanque from "./Estanques/Estanque.jsx";
import VerBiometrias2 from "./Biometrias/VerBiometriasCard.jsx";
import RegistrarBiometria from "./Biometrias/RegistrarBiometria.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>

      <App></App>

  </StrictMode>
);
