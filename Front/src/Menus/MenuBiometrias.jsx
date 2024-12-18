import React from "react";
import Boton from "../components/ui/Boton";
import "../components/styles/Menubiometrias.css";

function MenuBiometrias() {
  const linklogo =
    "https://raw.githubusercontent.com/Tupap1/Biometrics-SA/refs/heads/master/logo.png";
  return (
    <div className="menuee">
      <div className="menu1 ">
        <div className="Biometriastittle ">
          {" "}
          <center>
            <h1>Biometrias</h1>
          </center>
        </div>

        <div className="row">
          <div className="col">
            <Boton id="btnbio" text="Registrar Biometria" to="/Biometria" />
          </div>
          <div className="col">
            <Boton id="btnbio" text="Ver Biometrias" to="/VerBiometria" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBiometrias;
