import React from "react";
import Volver from "../components/ui/Volver";
import Form from "../components/ui/Form";
import { useState, useEffect, useRef  } from "react";
import Boton from "../components/ui/Boton";
import '../components/styles/Biometria.css'
import Lista from '../components/ui/Lista'
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
  const [fecha, setFechaActual] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [biomasa, setBiomasa] = useState("");
  const [estanqueData, setEstanqueData] = useState("");





  function Fecha({}) { 
    useEffect(() => {
      const intervalo = setInterval(() => {
        setFechaActual(new Date());
      }, 1000); 
  
      return () => clearInterval(intervalo);
    }, []);
  
    return (
      <div>
        {fecha.toLocaleDatetimeString()}
      </div>
    );
  }


  function Hora() {
    useEffect(() => {
      const intervalo = setInterval(() => {
        setHora(new Date());
      }, 1000);
  
      return () => clearInterval(intervalo);
    }, []);
  
    return (
      <div>
        {hora.toLocaleTimeString()}
      </div>
    );
  }

  const calcularbiomasa = () => {

  }


  const handleAddBiometria = () => {
    setPesos([...Pesos, parseFloat(peso)]);
    setLongitudes([...Longitudes, parseFloat(longitud)]);
    setPeso("");
    setLongitud("");

  }


      const keyDown = (event) => {
        if(event.key === 'Enter'){handleAddBiometria();}
        
    };

  const calcularPromedio = (datos) => {
    const numeros = datos.filter((dato) => !isNaN(dato));
    if (numeros.length === 0) return 0;
    return numeros.reduce((total, valor) => total + valor, 0) / numeros.length;};

    const promedioPeso = calcularPromedio(Pesos);
    const promedioLongitud = calcularPromedio(Longitudes);




  const handleSubmit = async (e) => {

    const data = {
      id_estanque: estanque,
      fecha: fecha,
      hora: hora,
      peso: promedioPeso,
      longitud: promedioLongitud,
      tamano_muestra: muestra,
      biomasa:biomasa
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
    setPesos([])
    setLongitudes([])
    alert("biometria registrada con exito")

  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/consultarestanque");
        const matchingEstanque = response.data.find((est) => est.id === estanque);
        setEstanqueData(matchingEstanque);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log(estanque)
  }, [estanque]);

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
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                onKeyDown={keyDown}
                autoFocus   
              />

              <br />
              <Form
                placeholder="Ingresa la longitud (mm)"
                type="number"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
                onKeyDown={keyDown}
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

      <div>
        <label htmlFor="">Seleciona el estanque</label>
        <Lista onChange={(e) => setEstanque (e.target.value) } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista></div>
        <label htmlFor="">Seleciona el tamaño de la muestra</label>
      
      <select className='form-select' value={muestra} onChange={(e) => setMuestra(e.target.value)}>
        <option value="5">5%</option>
        <option value="10">10%</option>          
      </select>

      <Boton className="btn btn-primary" text="Enviar" onClickCustom={handleSubmit} />
                  <h1>{estanqueData}</h1>
    </div>
  );
}

export default RegistrarBiometria;
