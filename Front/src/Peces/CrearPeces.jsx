import React from "react";
import { useState } from "react";
import Form from "../components/ui/Form";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import axios from "axios";
import "/src/Peces/crearpeces.css"
import pescado from "/src/assets/fotopescao.png"

function CrearPeces() {
  const [Raza, setRaza] = useState("");
  const [CantidadSemilla, setCantidadSemilla] = useState("");

  const data = {
    Raza: Raza,
    cantidadSemilla: CantidadSemilla,
  };

  const Enviar = async (e) => {

  
    try {
      const response = await axios.post("http://127.0.0.1:5000/registrarpeces", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    alert("Pez creado con exito")
  };

  return (
    <div className="padrastro">
      <div className="hija">
      <div id="volver">
        <Volver />
      </div>
      <div id="pes">
        <img src={pescado} alt="" />
      </div>
      <div className="title">
      <h1>Registrar Peces</h1>
      </div>
      <div className="frm2">
        <Form 
          placeholder="Ingrese el nombre de la raza"
          value={Raza}
          onChange={(e) => setRaza(e.target.value)}
        />
        <Form 
          placeholder="Ingrese cantidad de semilla (KG)"
          value={CantidadSemilla}
          onChange={(e) => setCantidadSemilla(e.target.value)}
        />
      </div>
      <div className="crear">
      <Boton id="crear2" className="btn btn-primary" text="Crear Raza" onClickCustom={Enviar} />
      </div>
      </div>
    </div>
  );
}

export default CrearPeces;
