import React from "react";
import "../components/styles/Biometria.css";
import Volver from "../components/ui/Volver";
import logo from "../assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import VerBiometrias2 from "./VerBiometriasCard";
import VerBiometriasCard from "./VerBiometriasCard";

function VerBiometria() {
  const [biometrias, setBiometrias] = useState([]);

  return (
    <div>
      <h2>Lista de Biometrías</h2>
      <VerBiometriasCard title={"nombreEstanque"} fecha={"fecha"} hora={"hora"}/>
    </div>
  );
}

export default VerBiometria;
