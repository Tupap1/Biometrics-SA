import React from "react";
import Volver from "../components/ui/Volver";
import Form from "../components/ui/Form";
import { useState,useEffect } from "react";
import Boton from "../components/ui/Boton";

function Biometria() {
  const [Pesos, setPesos] = useState([]);
  const [Longitudes, setLongitudes] = useState([]);
  const [peso, setPeso] = useState("");
  const [longitud, setLongitud] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date());
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const handleAddBiometria = () => {
    setPesos([...Pesos, parseFloat(peso)]); 
    setLongitudes([...Longitudes, parseFloat(longitud)]);

    setPeso("");
    setLongitud("");
  };


  const calcularPromedio = (datos) => {
    const numeros = datos.filter(dato => !isNaN(dato)); 
    if (numeros.length === 0) return 0;
    return numeros.reduce((total, valor) => total + valor, 0) / numeros.length;
  };

  const promedioPeso = calcularPromedio(Pesos);
  const promedioLongitud = calcularPromedio(Longitudes);

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

              <br />
              <Form
                placeholder="Ingresa la longitud (mm)"
                type="number"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
              />

              <div className="mt-3">
                <Boton
                  type="submit"
                  text="Ingresar"
                  onClickCustom={handleAddBiometria}
                />
              </div>
            </div>
            <div className="col-4">
              <div></div>
              <table>
                <thead>
                  <tr>
                    <th>Peso (gr)</th>
                    <th>Longitud (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {Pesos.map((peso, index) => (
                    <tr key={index}>
                      <td>{peso}</td>
                      <td>{Longitudes[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
      <p>Promedio de peso: {promedioPeso.toFixed(2)}</p>
      <p>Promedio de longitud: {promedioLongitud.toFixed(2)}</p>


      </div>
      <Boton text="Enviar" />
    </div>
  );
}

export default Biometria;
