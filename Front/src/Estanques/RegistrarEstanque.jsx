import React from "react";
import Form from "../components/ui/Form";
function RegistrarEstanque() {
  return (
    <div>
      <div>
        <h1>Registrar estanque</h1>
      </div>
      <div>
        <Form placeholder="ingresa el nombre del estanque" />
        <Form/>
      </div>
    </div>
  );
}

export default RegistrarEstanque;
