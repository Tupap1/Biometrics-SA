import React from "react";
import SideBar from "./components/ui/SideBar";
import Boton from "./components/ui/Boton";
import Form from "./components/ui/Form";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Inicio() {
  return (
 
      <div className="col">
        <SideBar />
      </div>  
  );
}

export default Inicio;
