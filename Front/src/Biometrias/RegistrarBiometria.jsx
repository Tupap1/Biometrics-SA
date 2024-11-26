import React from "react";
import Form from "../components/ui/Form";
import { useState, useEffect, useRef } from "react";
import Boton from "../components/ui/Boton";
import "../components/styles/Biometria.css";
import axios from "axios";
import Estanques from '../components/ui/Estanques.jsx'

function RegistrarBiometria() {
  const [Pesos, setPesos] = useState([]);
  const [Longitudes, setLongitudes] = useState([]);
  const [peso, setPeso] = useState("");
  const [longitud, setLongitud] = useState("");
  const [estanque, setEstanque] = useState(1);
  const [muestra, setMuestra] = useState("");
  const [fecha, setfecha] = useState("");
  const [hora, setHora] = useState("");
  const [biomasa, setBiomasa] = useState(0);
  const [estanqueData, setEstanqueData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  


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
    if (peso === "" || longitud === "") {
      alert("Por favor, completa todos los campos");
      return;
    }
    setPesos([...Pesos, parseFloat(peso)]);
    setLongitudes([...Longitudes, parseFloat(longitud)]);
    setPeso("");
    setLongitud("");
  };

  const handleCellClick = (index, type, value) => {
    setEditingCell({ index, type });
    setEditValue(value.toString());
  };

  const handleCellEdit = (e) => {
    setEditValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editingCell && editValue !== "") {
      const newValue = parseFloat(editValue);
      if (!isNaN(newValue)) {
        if (editingCell.type === "peso") {
          const newPesos = [...Pesos];
          newPesos[editingCell.index] = newValue;
          setPesos(newPesos);
        } else {
          const newLongitudes = [...Longitudes];
          newLongitudes[editingCell.index] = newValue;
          setLongitudes(newLongitudes);
        }
      }
    }
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCellBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setEditValue("");
    }
  };

  const keyDown = (event) => {
    if (event.key === "Enter") {
      const formulariopeso = document.getElementById("formpeso");
      const formulariolongitud = document.getElementById("formlongitud");

      if (document.activeElement === formulariopeso) {
        formulariolongitud.focus();
      } else if (document.activeElement === formulariolongitud) {
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

  const fetchData = async (e) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/estanque/${estanque}`
      );

      setEstanqueData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const calcularbiomasa = () => {
    fetchData();
    const numeropecesestanque = estanqueData.data.numeropeces;
    const biomasabiometria = parseInt(numeropecesestanque) * parseFloat(promedioPeso);
    console.log("biomasa")
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
      setPesos([]);
      setLongitudes([]);
      alert("biometria registrada con exito");
    } catch (error) {
      console.error(error);
    }
  };

  const TableCell = ({ value, isEditing, onChange, onKeyDown }) => {
    return isEditing ? (
      <input
        type="number"
        value={editValue}
        onChange={onChange}
        onBlur={handleCellBlur}
        onKeyDown={onKeyDown}
        autoFocus
        className="form-control form-control-sm"
        style={{ width: "80px" }}
      />
    ) : (
      <span className="editable-cell">{value}</span>
    );
  };

  return (
    <div className="main">
      <div className="row mt-3 mx-auto">
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
            <div id="datos" className="col-4">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Peso (gr)</th>
                    <th>Longitud (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {Pesos.map((peso, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => handleCellClick(index, "peso", peso)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          value={peso}
                          isEditing={
                            editingCell?.index === index &&
                            editingCell?.type === "peso"
                          }
                          onChange={handleCellEdit}
                          onKeyDown={handleKeyDown}
                        />
                      </td>
                      <td
                        onClick={() =>
                          handleCellClick(index, "longitud", Longitudes[index])
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          value={Longitudes[index]}
                          isEditing={
                            editingCell?.index === index &&
                            editingCell?.type === "longitud"
                          }
                          onChange={handleCellEdit}
                          onKeyDown={handleKeyDown}
                        />
                      </td>
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
        <Estanques onInit={(e) =>{setEstanque(e); fetchData(e);}} onChange={(e) => {setEstanque(e.target.value); fetchData(e.target.value); calcularbiomasa(e.target.value);}} value={estanque} apiURL={"http://127.0.0.1:5000/consultarestanque"}></Estanques>
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
      <h1>{estanque}</h1>
    </div>
  );
}

export default RegistrarBiometria;
