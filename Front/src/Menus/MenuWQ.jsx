import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import '../components/styles/WQ.css'



function MenuWQ() {
  const linklogo = "https://raw.githubusercontent.com/Tupap1/Biometrics-SA/refs/heads/master/logo.png"
  return (
    <div>
      <div  id="fondo2"className="col-8">
        <div className="row  mb-4 mt-3">
          <div className="col-2 ">
            <Volver />
          </div>
           <img id="logo"src={linklogo} alt="" /> 
          
          
          <div className="col-7 mx-auto ">
            {" "}
            <div className="title">
              <div className="titlee">
            <center>

              <h1>Calidad del Agua </h1>
            </center>
            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Boton id="bt1" text="Registrar WQ" to="/WQ" />
          </div>
          <div className="col">
            <Boton id="bt2" text="Ver registros WQ" to="/VerWQ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuWQ;
