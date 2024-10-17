import React from "react";
import Form from "../components/ui/Form";
import "../components/styles/WQ.css";
import Boton from "../components/ui/Boton";


function WQ() {
  return (
    <div className="col">
    <div className="row">
      <div id="registrarWQ">Registrar WQ</div>
    </div>
      <div className="row" id="forms">
        <Form placeholder="Niveles de nitrogeno" />
        <Form placeholder="Niveles de Oxigeno" />
        <Form placeholder="Niveles de Sulfuro" />
        <Form placeholder="Niveles de Nitratos" />
        <Form placeholder="Niveles de contaminacion general" />
      </div>  
      <div className="ingresar"><Boton   id="ingresar" className="ingresar" text="Ingresar"/></div>
    </div>
  );
}

export default WQ;
