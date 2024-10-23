import React from "react";
import Form from "../components/ui/Form";
import "/src/WQ/WQ.css";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import pescado from "/src/assets/fotopescao.png"


function WQ() {
  return (
    <div id="padre" className="col">
    <div id="wq" className="row">
        <div id="back" className="col">
          {" "}
          <Volver />
        </div>
        <div className="logo2">
          <img src={pescado} alt="" />
        </div>
      <div id="registrarWQ">Registrar WQ</div>
    </div>
      <div className="row" id="forms">
        <Form placeholder="Niveles de nitrogeno" />
        <Form placeholder="Niveles de Oxigeno" />
        <Form placeholder="Niveles de Sulfuro" />
        <Form placeholder="Niveles de Nitratos" />
        <Form placeholder="Niveles de contaminacion general" />
      </div>  
      <div className="ingresar"><Boton id="ingresar" className="ingresar" text="Ingresar"/></div>
    </div>
  );
}

export default WQ;
