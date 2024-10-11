import React from "react";
import Volver from "../components/ui/Volver";
import Form from "../components/ui/Form";
import { useState } from "react";
import Boton from "../components/ui/Boton";

function Biometria() {
  const [biometrias, setBiometrias] = useState([]);
  const [peso, setPeso] = useState("");
  const [longitud, setLongitud] = useState("");
  const [errorlongitud, setErrorlongitud] = useState(false);
  const [errorpeso, setErrorpeso] = useState(false);



  
  
  const handleAddBiometria = () => {
    setBiometrias([...biometrias, { peso, longitud }]);
    setPeso("");
    setLongitud("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorlongitud(longitud === '');
    setErrorpeso(peso === '');}
  
  const calcularPromedio = (datos, propiedad) => {
    if (datos.length === 0) return 0;
    return (
      datos.reduce((total, item) => total + item[propiedad], 0) / datos.length
    );
  };

  if (!errorpeso && !errorlongitud) {
    alert("Ingresa los datos completos");
  }

  return (
    <div>
      <div className="row mt-3 mx-auto">
        <div className="col">
          {" "}
          <Volver />
        </div>
        <div className="col mx-auto">
          <h2>Registrar Biometria</h2>
        </div>

        <div>
          <div className="row mt-5 mx-auto">
            <div className="col-5">
              <Form
                placeholder="Ingresa el peso (gr)"
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                
              />
              {setErrorpeso && <span>El nombre es obligatorio</span>}
              <br />
              <Form
                placeholder="Ingresa la longitud (mm)"
                type="number"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
                
              />
              {setErrorlongitud && <span>La longitud es obligatoria</span>}
              <div className="mt-3">
                <Boton type="submit" text="Ingresar" onClickCustom={handleAddBiometria} />
              </div>
            </div>
            <div className="col-4">
              {" "}
              <ul>
                {biometrias.map((biometria, index) => (
                  <li key={index}>
                    {" "}
                    {biometria.peso}, {biometria.longitud}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div></div>

        <p>Promedio de Peso: {calcularPromedio(biometrias, "peso")} gr</p>
        <p>
          Promedio de Longitud: {calcularPromedio(biometrias, "longitud")} mm
        </p>
      </div>
    </div>
  );
}

export default Biometria;