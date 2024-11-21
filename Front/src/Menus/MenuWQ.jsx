import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import "../components/styles/WQ.css";

function MenuWQ() {
  return (
    <div>
      <div id="fondo2" >
        <div className="row  ">
          <div className="col">
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
            <Boton id="bt1" text="Ver registros WQ" to="/VerWQ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuWQ;
