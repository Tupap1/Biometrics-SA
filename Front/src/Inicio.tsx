import React from "react";
import SideBar from "./components/ui/SideBar";
import Boton from "./components/ui/Boton";
import Form from "./components/ui/Form";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Inicio() {
  
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <SideBar />
        </div>

        <div className="col-8">
          <div className="row">
            <div className="col">
              <Boton text="Registrar Biometria" to="/Biometria"/>
            </div>
            <div className="col">
              <Boton text="Registro WQ" to="/" />
            </div>
            <div className="col">
              <Boton text="Registrar estanque" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
