import React from "react";
import Form from "../components/ui/Form";
import Lista from "../components/ui/Lista";


function RegistrarEstanque() {
  return (
    <div>
      <div>
        <h1>Registrar estanque</h1>
      </div>
      <div>
        <Form placeholder="ingresa el nombre del estanque" />
        <Form placeholder="selecione la raza"/>
        <Lista apiURL="http://127.0.0.1:5000/consultarpeces"></Lista>
      </div>
    </div>
  );
}

export default RegistrarEstanque;
