import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import "../components/styles/Menuestanques.css";

function MenuEstanques() {
  return (
    <div>
      {" "}
      <div >
        <div id="fondo">
          <div></div>
          <div id="title">
              <h1>Estanques</h1>
          </div>
          <div>
            <div className="row">
              <div className="col">
                <Boton
                  id="btn1"
                  text="Registrar Estanques"
                  to="/RegistrarEstanques"
                />
              </div>
            <div className="col">
              <Boton id="btn1" text="Ver Estanques" to="/VerEstanques" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuEstanques;
