import React, { } from 'react';
import './components/styles/App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';  
import LandingPage from "./LandingPage";
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import Biometria from './ResgisterBiometrias';
 
function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center"></h1>
   
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menu" element={<Biometria />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
   
export default App;