import React from "react";
import Form from "../components/ui/Form";
import Lista from "../components/ui/Lista";
import Boton from "../components/ui/Boton";
import { useState } from "react";
import axios from "axios";


function RegistrarEstanque() {
const [nombreEstanque, setnombreEstanque] = useState("")
const [tamanoEstanque,settamanoEstanque] =useState("")
const [id_pez,setid_pez] = useState("")


const data = {
  id_pez: id_pez,
  tamanoestanque: tamanoEstanque,
  nombreEstanque: nombreEstanque
};

const handleSubmit = async (e) => {


  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/crearestanque",
      data
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  alert("estanque creado")
};



  return (
    <div>
      <div>
        <h1>Registrar estanque</h1>
      </div>
      <div>
        <Form value={nombreEstanque} onChange={(e) =>setnombreEstanque(e.target.value)} placeholder="ingresa el nombre del estanque" />
          <Form 
          value={tamanoEstanque} onChange={(e) =>settamanoEstanque(e.target.value)} placeholder="Ingresa el tamaño del estanque m2"/>
        <Lista onChange={(e) => setid_pez(e.target.value)} apiURL="http://127.0.0.1:5000/consultarpeces"/>
          <h1>{id_pez}</h1>
        <Boton onClickCustom={handleSubmit} text="Guardar estanque"/>
      </div>
    </div>
  );
}

export default RegistrarEstanque;
