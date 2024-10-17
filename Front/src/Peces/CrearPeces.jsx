import React from "react";
import { useState } from "react";
import Form from "../components/ui/Form";
import Boton from "../components/ui/Boton";
import Volver from "../components/ui/Volver";
import axios from "axios";


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
    <div>
      <div>
        <Volver />
        <h1>Registrar Peces</h1>
      </div>
      <div>
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
      <Boton text="Crear Raza" onClickCustom={Enviar} />
    </div>
  );
}

export default CrearPeces;
