import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import { useState, useEffect } from "react";
import axios from "axios";
import Signout from "../components/ui/Signout";
import "../components/styles/Inicio.css";
import "/src/Peces/crearpeces.css"
import ButtonWithHover from "../components/ui/Menu";


function MenuInicio() {
  const linklogo =
    "https://raw.githubusercontent.com/Tupap1/Biometrics-SA/refs/heads/master/logo.png";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user");
        if (response.data) {
          setIsLoggedIn(true);
          setUserName(response.data.nombres);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    checkLoginStatus();
  }, []);

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
      <div className="padre">
        <div className="hijo">
          <div
            class="row "
          >
        <div id="pes">
            <img id="fotopez" src={"asd"} alt="" />
          </div>
          <div id="volver">
            <Volver></Volver>

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
              <Boton
                className="boton"
                text="Estanques"
                to="/VerEstanques"
              />
            </div>
            <div className="col">
              <Boton className="boton" text="Peces" to="/CrearPeces" />
            </div>
            <div className="col">
              <Boton className="boton" text="Alimentos" to="/VerAlimento"/>
            </div>
            <div className="col">
              <Boton className="boton" text="Calcular Comidas" to="/Calculadora"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuInicio;
