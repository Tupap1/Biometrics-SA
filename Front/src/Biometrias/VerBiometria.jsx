import React from "react";
import "../components/styles/Biometria.css";
import Volver from "../components/ui/Volver";
import logo from '../assets/logo.png'
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card";



function VerBiometria() {
  const [biometrias, setBiometrias] = useState([]);


  return (
    <div>
      <h2>Lista de Biometrías</h2>
    <Card title={"idbiometria"} info={"fecha"} link={"/biometria"} info2={"hora"} textboton={"Ver Biometria"} text={"Fecha:"} apiURL={"http://127.0.0.1:5000/consultarbiometrias"}/>
    </div>
  );
}


export default VerBiometria;
