import React from "react";
import "../components/styles/Biometria.css";
import Volver from "../components/ui/Volver";
import logo from '../assets/logo.png'

function VerBiometria() {


  return (
    <div className="col">
      <div className="row" id="main">
        <div className="volver">
          <Volver />
        </div>
        <div className="ver">VerBiometria</div>
        <img id="logo" src={logo} alt="" />
      </div>
    </div>
  );
}

export default VerBiometria;
