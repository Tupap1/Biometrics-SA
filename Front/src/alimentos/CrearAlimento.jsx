import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from "../components/ui/Form";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";


function CrearAlimento() {
  const [nombrealimento,setnombrealimento] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [Unidad, setUnidad] = useState("");

  const data = {
    nombrealimento:nombrealimento,
    cantidad:cantidad,
    unidad:Unidad
  };

  const Enviar = async (e) => {

  
    try {
      const response = await axios.post("http://127.0.0.1:5000/crearalimento", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    alert("Alimento creado con exito")
  };

  return (
    <div className="padrastro">
      <div className="hija">


      <div className="title">
      <h1>Crear Alimento</h1>
      </div>
      <div className="frm2">
        <Form 
          placeholder="Ingrese el nombre del alimento"
          value={nombrealimento}
          onChange={(e) => setnombrealimento(e.target.value)}
        />
        <Form 
          placeholder="Ingrese cantidad de alimento almacenado"
          value={cantidad}
          type="number"
          onChange={(e) => setcantidad(e.target.value)}
        />
        <Form 
          placeholder="Ingrese la unidad de medida"
          value={Unidad}
          onChange={(e) => {setUnidad(e.target.value); setUnidad(e.target.value.toUpperCase()) }}
        />
      </div>
      <div className="crear">
      <Boton id="crear2" className="btn btn-primary" text="Crear Alimento" onClickCustom={Enviar} />
      </div>
      </div>
    </div>
  );
}

export default CrearAlimento;
