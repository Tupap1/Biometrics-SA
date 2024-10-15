import React, { } from 'react';
import './components/styles/App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';  
import LandingPage from "./LandingPage";
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

 
function App() {
  return (
    <div >
          <div className="row">
      <div className="col"><Inicio /></div>
      
      <BrowserRouter>
        <div className="col-9">
          <Routes>
            <Route path="/" element={<MenuInicio />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Biometria" element={<Biometria />} />
            <Route path="/MenuBiometria" element={<MenuBiometrias />} />
            <Route path="/VerBiometria" element={<VerBiometria />} />
            <Route path="/MenuWQ" element={<MenuWQ />} />
            <Route path="/WQ" element={<WQ />} />
            <Route path="/VerWQ" element={<VerWQ />} />
            <Route path="/MenuEstanques" element={<MenuEstanques />} />
            <Route path="/RegistrarEstanques" element={<RegistrarEstanque />} />
            <Route path="/VerEstanques" element={<VerEstanques />} />
            <Route path="/Ve" element={<VerEstanques />} />
            

            
            
            
          </Routes>
        </div>
      </BrowserRouter>  
  
    </div>
    </div>
  );
}
   
export default App;