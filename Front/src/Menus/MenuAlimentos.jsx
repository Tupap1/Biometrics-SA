import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import { useState, useEffect } from "react";
import axios from "axios";
import Signout from "../components/ui/Signout";
import "../components/styles/Inicio.css";
import "/src/Peces/crearpeces.css"

function MenuAlimentos() {
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
          <div class="row "></div>
          <div className="row">
            <div className="col">
              <Boton
                className="boton"
                text="Crear Alimentos"
                to="/CrearAlimento"
              />
            </div>
            <div className="col">
              <Boton className="boton" text="Ver Alimentos" to="/VerAlimento" />
            </div>
            <div className="col">
              <Boton
                className="boton"
                text="Ver Alimentaciones"
                to="/VerAlimentacion"
              />
            </div>

            <div className="col">
              <Boton
                className="boton"
                text="Crear Alimentacion"
                to="/RegistrarAlimentacion"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAlimentos;
