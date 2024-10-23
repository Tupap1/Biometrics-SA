import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import '../components/styles/Menuestanques.css'


function MenuEstanques() {
  const linklogo = "https://raw.githubusercontent.com/Tupap1/Biometrics-SA/refs/heads/master/logo.png"
  return (
    <div>
      {" "}
      
      <div className="col-8">
        <div className ="row  mb-4 mt-3" id="fondo">
          <div  className="col-2 ">
            <Volver />
          </div>
          <div>
          <img  id="logo" src={linklogo} alt="" /> 
          </div>
          <div className="col-7 mx-auto " id="title">
          
            <center>
              <h1>Estanques</h1>
            </center>
            </div>
            <div>
          
        
        <div className="row">
          <div className="col">
            <Boton id="btn1" text="Registrar Estanques" to="/RegistrarEstanques" />
          </div>
          </div>
          <div className="col">
            <Boton  id="btn2" text="Ver Estanques"  to="/VerEstanques" />
            </div>
            </div>
          
        
      </div>
    </div>
    </div>
  );
}

export default MenuEstanques;
