import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import "../components/styles/Menubiometrias.css";
import pescado from "/src/assets/fotopescao.png"

function MenuBiometrias() {
  
  return (
    <div className="menu1 ">
        <div className="buttonvolver "><Volver /></div>
          <div className="logo">
            <img src={pescado} alt="" />
          </div>
        <div className="Biometriastittle "> <center><h1>Biometrias</h1></center></div>
     
      
          <Boton text="Registrar Biometria" to="/Biometria" />
          <Boton text="Ver Biometrias" to="/VerBiometria" />
          
          
    </div>
      
    
  );
}

export default MenuBiometrias;
