import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import { useState, useEffect } from "react";
import axios from "axios";
import Signout from "../components/ui/Signout";
import "../components/styles/Inicio.css";
import "/src/Peces/crearpeces.css";

function MenuInicio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/login", {
        email,
        contrasena: password,
      });
      if (response.data) {
        setIsLoggedIn(true);
        setUserName(response.data.nombres);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="row ">
            <div id="pes">
              <img id="fotopez" src={"asd"} alt="" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Boton className="boton" text="Biometrias" to="/VerBiometria" />
            </div>
            <div className="col">
              <Boton className="boton" text="WQ' s" to="/VerWQ" />
            </div>
            <div className="col">
              <Boton className="boton" text="Estanques" to="/VerEstanques" />
            </div>
            <div className="col">
              <Boton className="boton" text="Peces" to="/CrearPeces" />
            </div>
            <div className="col">
              <Boton className="boton" text="Alimentos" to="/VerAlimento" />
            </div>
            <div className="col">
              <Boton
                className="boton"
                text="Calcular Comidas"
                to="/Calculadora"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuInicio;
