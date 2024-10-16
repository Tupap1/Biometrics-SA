import React from "react";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import { useState, useEffect } from "react";
import axios from 'axios';
import Signout from "../components/ui/Signout";

function MenuInicio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,   
 setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const   
 response = await axios.get('http://127.0.0.1:5000/user'); 
        if (response.data) {
          setIsLoggedIn(true);
          setUserName(response.data.nombres); 
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, contrasena: password });
      if (response.data) {
        setIsLoggedIn(true);
        setUserName(response.data.nombres); 
      }
    } catch (error) {
      console.error('Login error:', error);
      
    }
  };


  return (
    <div>
      <div>
        <div className="row  mb-4 mt-3">
          <div className="col-9 ">
            <center>
              <h1>Inicio</h1>
              <h1>Welcome, {userName}!</h1>
            </center>
          </div>
          <div className="col"><Signout/></div>
        </div>
        <div className="row">
          <div className="col">
            <Boton text="Registrar Biometria" to="/Biometria" />
          </div>
          <div className="col">
            <Boton text="Registro WQ" to="/WQ" />
          </div>
          <div className="col">
            <Boton text="Registrar Estanque" to="RegistrarEstanques" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuInicio;
