import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";

function MenuBiometrias() {
  return (
    <div className="col-8">
      <div className="row  mb-4 mt-3">
        <div className="col-2 "><Volver /></div>
        <div className="col-7 mx-auto "> <center><h1>Biometrias</h1></center></div>
      </div>
      <div className="row">
        <div className="col">
          <Boton text="Registrar Biometria" to="/Biometria" />
        </div>
        <div className="col">
          <Boton text="Ver Biometrias" to="/VerBiometria" />
        </div>
      </div>
    </div>
  );
}

export default MenuBiometrias;
