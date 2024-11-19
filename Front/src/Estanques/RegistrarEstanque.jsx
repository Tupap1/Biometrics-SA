import React from "react";
import Form from "../components/ui/Form";
import Lista from "../components/ui/Lista";
import Boton from "../components/ui/Boton";
import { useState } from "react";
import axios from "axios";
import Volver from "../components/ui/Volver";
import "/src/Estanques/registerponds.css";
import { useEffect } from "react";

function RegistrarEstanque() {
  const [nombreEstanque, setnombreEstanque] = useState("");
  const [tamanoEstanque, settamanoEstanque] = useState("");
  const [numeropeces, setnumeropeces] = useState("");
  const [id_pez, setid_pez] = useState("");



  const data = {
    id_pez: id_pez,
    tamanoestanque: tamanoEstanque,
    numeropeces: numeropeces,
    nombreEstanque: nombreEstanque,
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
    setnombreEstanque("");
    setnumeropeces("");
    settamanoEstanque("");
    alert("estanque creado");
  };

  return (
    <div className="madre">
      <div className="hijo">
        <div id="back" className="col">
          {" "}
          <Volver />
        </div>
        <div className="logo2"></div>
        <div className="title">
          <h1>Registrar estanque</h1>
        </div>
        <div className="formulario">
          <div className="frm">
            <Form
              value={nombreEstanque}
              onChange={(e) => setnombreEstanque(e.target.value)}
              placeholder="ingresa el nombre del estanque"
            />
            <Form
              value={tamanoEstanque}
              onChange={(e) => settamanoEstanque(e.target.value)}
              placeholder="Ingresa el tamaño del estanque m2"
            />
            <Form
              value={numeropeces}
              onChange={(e) => setnumeropeces(e.target.value)}
              placeholder="Ingrese el numero de peces en el estanque"
              type="number"
            />
             <Lista   onChange={(e) => setid_pez(e.target.value)} apiURL="http://127.0.0.1:5000/consultarpeces" onInit={(e) => setid_pez(e)} /> 
            <h1>
            </h1>
          </div>
        
            

          <div className="guardar">
            <Boton
              className="btn btn-primary"
              id="guardar2"
              onClickCustom={handleSubmit}
              text="Guardar estanque"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarEstanque;
