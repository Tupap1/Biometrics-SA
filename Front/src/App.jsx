import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./components/styles/index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./Inicio.tsx";
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import React, { useState } from "react";
import Biometria from "./Biometrias/Biometria.jsx";
import MenuInicio from "./Menus/MenuInicio.jsx";
import MenuBiometrias from "./Menus/MenuBiometrias.jsx";
import VerBiometria from "./Biometrias/VerBiometria.jsx";
import MenuWQ from "./Menus/MenuWQ.jsx";
import WQ from "./WQ/WQ.jsx";
import VerWQ from "./WQ/VerWQ.jsx";
import MenuEstanques from "./Menus/MenuEstanques.jsx";
import RegistrarEstanque from "./Estanques/RegistrarEstanque.jsx";
import VerEstanques from "./Estanques/VerEstanques.jsx";
import CrearPeces from "./Peces/CrearPeces.jsx";
import Estanque from "./Estanques/Estanque.jsx";
import VerBiometrias2 from "./Biometrias/VerBiometriasCard.jsx";
import RegistrarBiometria from "./Biometrias/RegistrarBiometria.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ui/Protectedroutes.jsx";





function App() {
  const [logged, setLogged] = useState(false)
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  


  return (
    <Auth0Provider
    domain="dev-izfv3s2t8dut821k.us.auth0.com"
    clientId="gZ36DhwQj5euckP4ovjW5M9Lom8PDjz5"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}> 
    <div>
      <div className="row">
      <div className="col"><Inicio /></div>
      
      <BrowserRouter>
      <div className="col-9">
              <Routes>

                <Route path="/" element={<MenuInicio />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />


                <Route 
                  path="/Biometria" 
                  element={ <RegistrarBiometria />  }   />
                <Route path="/MenuBiometria" element={<MenuBiometrias/>}/>
                <Route 
                  path="/VerBiometria" 
                  element={<VerBiometria />} 
                />
                <Route 
                  path="/MenuWQ" 
                  element= {<MenuWQ />}
                />
                <Route 
                  path="/WQ" 
                  element={<WQ/>} 
                />
                <Route 
                  path="/VerWQ" 
                  element={<VerWQ />} 
                />
                <Route 
                  path="/MenuEstanques" 
                  element={ <MenuEstanques />} 
                />
                <Route 
                  path="/RegistrarEstanques" 
                  element={ <RegistrarEstanque />} 
                />
                <Route 
                  path="/VerEstanques" 
                  element={ <VerEstanques />} 
                />
                <Route 
                  path="/CrearPeces" 
                  element={ <CrearPeces />}  
                />
                <Route 
                  path="/Estanque" 
                  element={ <Estanque />} 
                />
                <Route 
                  path="/biometria/:id" 
                  element={ <Biometria />} 
                />
              </Routes>
            </div>
      </BrowserRouter>  
  
    </div>


    </div>
    </Auth0Provider>
  )
}

export default App