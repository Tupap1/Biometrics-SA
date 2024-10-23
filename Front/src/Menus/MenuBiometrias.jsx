import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import "../components/styles/Menubiometrias.css";


function MenuBiometrias() {
  const linklogo = "https://raw.githubusercontent.com/Tupap1/Biometrics-SA/refs/heads/master/logo.png"
  return (
    <div className="menuee">
    <div className="menu1 ">
        <div className="buttonvolver "><Volver /></div>
          <div className="logo">
             <img src={linklogo} alt="" /> 
          </div>
        <div className="Biometriastittle "> <center><h1>Biometrias</h1></center></div>

      
          <Boton id="btnbio"text="Registrar Biometria" to="/Biometria" />
          <Boton id="btnbio1"text="Ver Biometrias" to="/VerBiometria" />
          
          </div>
    </div>
      
    
  );
}

export default MenuBiometrias;
