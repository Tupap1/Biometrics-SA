  import React from "react";
  import Form from "../components/ui/Form";
  import "../components/styles/WQ.css";
  import Boton from "../components/ui/Boton";
  import { useState } from "react";
  import { DataRouterStateContext } from "react-router/dist/lib/context";
  import axios from "axios";

  function WQ() {
  const [nitrogeno, setNitrogeno] = useState("")
  const [Oxigeno, setOxigeno] = useState("")
  const [Sulfuro, setSulfuro] = useState("")
  const [nitratos, setNitratos] = useState("")
  const [Informacion, setInformacion] = useState("")

  const datos ={ 
    nitrogeno:nitrogeno,
    Oxigeno: Oxigeno,
    Sulfuro:Sulfuro,
    nitratos:nitratos,
    Informacion:Informacion
  } 

  const enviardatos = axios.post('')

    return (
      <div className="col">
      <div className="row">
        <div id="registrarWQ">Registrar WQ</div>
      </div>
        <div className="row" id="forms">
          <Form value={nitrogeno} onChange={(e) => setNitrogeno(e.target.value)} placeholder="Niveles de nitrogeno" />
          <Form value={Oxigeno} onChange={(e) => setOxigeno(e.target.value)} placeholder="Niveles de Oxigeno" />
          <Form value={Sulfuro} onChange={(e) => setSulfuro(e.target.value)} placeholder="Niveles de Sulfuro" />
          <Form value={nitratos} onChange={(e) => setNitratos(e.target.value)} placeholder="Niveles de Nitratos" />
          <Form value={Informacion} onChange={(e) => setInformacion(e.target.value)} placeholder="Ingresa una descripcion de la inpeccion visual del estanque" />
        </div>  
        <div className="ingresar"><Boton   id="ingresar" className="ingresar" text="Ingresar"/></div>
      </div>
    );
  }

  export default WQ;
