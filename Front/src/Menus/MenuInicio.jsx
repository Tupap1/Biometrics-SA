import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";

function MenuInicio() {
  return (
    <div>
      <div>
        <div className="row  mb-4 mt-3">

          <div className="col-9 ">
            <center>
              <h1>Inicio</h1>
            </center>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Boton text="Registrar Biometria" to="/Biometria" />
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
  );
}

export default MenuInicio;
