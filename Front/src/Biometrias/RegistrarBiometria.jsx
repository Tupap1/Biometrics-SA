import React from "react";
import Volver from "../components/ui/Volver";
import Form from "../components/ui/Form";
import { useState, useEffect, useRef } from "react";
import Boton from "../components/ui/Boton";
import "../components/styles/Biometria.css";
import Lista from "../components/ui/Lista";
import axios from "axios";
import VerBiometriasCard from "./VerBiometriasCard";
import GetApiData from "../components/ui/GetApiData";

function RegistrarBiometria() {
  const [Pesos, setPesos] = useState([]);
  const [Longitudes, setLongitudes] = useState([]);
  const [peso, setPeso] = useState("");
  const [longitud, setLongitud] = useState("");
  const [estanque, setEstanque] = useState("");
  const [muestra, setMuestra] = useState("");
  const [fecha, setfecha] = useState("");
  const [hora, setHora] = useState("");
  const [biomasa, setBiomasa] = useState(0);
  const [estanqueData, setEstanqueData] = useState([]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const fechaactual = new Date().toLocaleDateString();

      const [dia, mes, año] = fechaactual.split("/");
      const fechaFormateada = `${año}:${mes}:${dia}`;

      setfecha(fechaFormateada);
      setHora(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const handleAddBiometria = () => {
    if (peso === '' || longitud === '') {
      alert('Por favor, completa todos los campos');
      return;
    }else{
      setPesos([...Pesos, parseFloat(peso)]);
      setLongitudes([...Longitudes, parseFloat(longitud)]);
      setPeso("");
      setLongitud("");      
    }

  };

  const keyDown = (event) => {
    if (event.key === "Enter") {
      const formulariopeso = document.getElementById('formpeso');
      const formulariolongitud = document.getElementById('formlongitud');
      
      if(document.activeElement === formulariopeso){
        formulariolongitud.focus();
      } else if(document.activeElement === formulariolongitud){
        handleAddBiometria();
        formulariopeso.focus();
      } else {
        handleAddBiometria();
      }

    }
  };


  const calcularPromedio = (datos) => {
    const numeros = datos.filter((dato) => !isNaN(dato));
    if (numeros.length === 0) return 0;
    return numeros.reduce((total, valor) => total + valor, 0) / numeros.length;
  };

  const promedioPeso = calcularPromedio(Pesos);
  const promedioLongitud = calcularPromedio(Longitudes);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/consultarestanque"
      );
      const matchingEstanque = response.data.find(
        (est) => est.id_estanque === parseInt(estanque)
      );
      setEstanqueData(matchingEstanque);
    } catch (error) {
      console.error(error);
    }
  };

  const calcularbiomasa = () => {
    fetchData();
    const numeropecesestanque = estanqueData.numeropeces;
    const biomasabiometria = parseFloat(numeropecesestanque) * parseFloat(promedioPeso);
    setBiomasa(parseFloat(biomasabiometria));
  };

  const handleSubmit = async (e) => {
    const data = {
      id_estanque: estanque,
      fecha: fecha,
      hora: hora,
      peso: promedioPeso,
      longitud: promedioLongitud,
      tamano_muestra: muestra,
      biomasa: biomasa,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/biometria",
        data
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setPesos([]);
    setLongitudes([]);
    alert("biometria registrada con exito");
  };

  return (
    <div className="main">
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
                id="formpeso"
                value={peso}
                required
                onChange={(e) => {
                  setPeso(e.target.value);
                  calcularbiomasa(e.target.value);
                }}
                onKeyDown={keyDown}
                autoFocus
              />

              <br />
              <Form
                placeholder="Ingresa la longitud (mm)"
                type="number"
                id="formlongitud"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
                onKeyDown={keyDown}
              />

              <div className="mt-3">
                <Boton
                  className="btn btn-primary"
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
        <p>Promedio de peso: {promedioPeso.toFixed(2)} gr</p>
        <p>Promedio de longitud: {promedioLongitud.toFixed(2)} mm</p>
        <p>Biomasa: {biomasa.toFixed(2)} gr</p>
      </div>

      <div>
        <label htmlFor="">Seleciona el estanque</label>
        <Lista
          onInit={(e) => setEstanque(e)}
          value={estanque}
          onChange={(e) => {
            setEstanque(e.target.value);
            fetchData();
            calcularbiomasa(e.target.value);
          }}
          apiURL="http://127.0.0.1:5000/consultarestanque"
        ></Lista>
      </div>
      <label htmlFor="">Seleciona el tamaño de la muestra</label>
      <select
        className="form-select"
        value={muestra}
        onChange={(e) => setMuestra(e.target.value)}
      >
        <option value="5">5%</option>
        <option value="10">10%</option>
      </select>

      <Boton
        className="btn btn-primary"
        text="Enviar"
        onClickCustom={handleSubmit}
      />
    </div>
  );
}

export default RegistrarBiometria;
