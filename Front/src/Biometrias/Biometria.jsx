import React from "react";
import Volver from "../components/ui/Volver";
import Form from "../components/ui/Form";
import { useState } from "react";
import Boton from "../components/ui/Boton";

function Biometria() {
  const [Pesos, setPesos] = useState([]);
  const [Longitudes, setLongitudes] = useState([]);
  const [peso, setPeso] = useState("");
  const [longitud, setLongitud] = useState("");

  const handleAddBiometria = () => {
    setPesos([...Pesos, peso]);
    setLongitudes([...Longitudes, longitud]);

    setPeso("");
    setLongitud("");
  };

  const calcularPromedio = (datos, propiedad) => {
    if (datos.length === 0) return 0;
    return (
      datos.reduce((total, item) => total + item[propiedad], 0) / datos.length
    );
  };

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
            <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>Mark</td>
                      <td>Otto</td>

                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Thornton</td>

                    </tr>
                    <tr>
                      <td colspan="2">Larry the Bird</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul>
                {Pesos.map((peso, index) => (
                  <li key={index}>
                    {peso}, {Longitudes[index]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div></div>

        {/*       <p>Promedio de Peso: {PesoPromedio(Pesos, "peso")} gr</p> */}
        <p>
          Promedio de Longitud: {calcularPromedio(Longitudes, "longitud")} mm
        </p>
      </div>
    </div>
  );
}

export default Biometria;
