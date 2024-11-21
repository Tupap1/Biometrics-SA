import React from "react";
import Form from "../components/ui/Form";
import "../components/styles/WQ.css";
import Lista from "../components/ui/Lista";
import Boton from "../components/ui/Boton";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggled from "../components/ui/Toggled";

function WQ() {
  const [enviandoDatos, setEnviandoDatos] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [estanque, setEstanque] = useState("");
  const [nitrogeno, setNitrogeno] = useState("");
  const [Oxigeno, setOxigeno] = useState("");
  const [Sulfuro, setSulfuro] = useState("");
  const [nitratos, setNitratos] = useState("");
  const [Informacion, setInformacion] = useState("");
  const [hora, setHora] = useState("");
  const [fecha, setfecha] = useState("");
  const [registrar, setRegistrar] = useState(false);
  const [categories, setCategories] = useState({
    Oxigeno: false,
    Ozono: false,
    Temperatura: false,
    PH: false,
    Dureza: false,
    Magnesio: false,
    Manganeso: false,
    Calcio: false,
    CO2: false,
    Amonio1: false,
    Amonio2: false,
    Nitritos: false,
    Fosfatos: false,
    Fosforo1: false,
    Fosforo2: false,
    Sulfuro: false,
    HCN: false,
    Metano: false,
    Cadmio: false,
    Cloro: false,
    Cobre: false,
    Cromo: false,
    Hierro: false,
    Mercurio: false,
    Niquel: false,
    Plomo: false,
    Turbidez: false,
    Solidos: false,
    Sulfatos: false,
    Zinc: false,
  });
  const [toggled, setToggled] = useState(false);

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

  const handleCancelEdit = () => {
    setEstanque(null);
    setIsEditing(false);
  };

  const handleCheckboxChange = (e) => {
    setCategories({
      ...categories,
      [e.target.name]: !categories[e.target.name],
    });
  };

  const datos = {
    idestanque: estanque,
    Nitrogeno: nitrogeno,
    Oxigeno: Oxigeno,
    Sulfuro: Sulfuro,
    Nitratos: nitratos,
    Informacion: Informacion,
    hora: hora,
    fecha: fecha,
  };

  const enviardatos = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/WQ", datos);
      console.log(response.data);
      alert("Datos Guardados con exito");
      setInformacion("");
      setNitratos("");
      setNitrogeno("");
      setOxigeno("");
      setSulfuro("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
  
    <div>
      {enviandoDatos === false ? (
        <div className="row">
        <div className=" row">
          <div className="col">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Oxigeno"
                type="checkbox"
                id="Oxigeno"
                checked={categories.Oxigeno}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Oxigeno">
                Oxigeno disuelto
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Ozono"
                type="checkbox"
                id="Ozono"
                checked={categories.Ozono}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Ozono">
                Ozono
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Temperatura"
                type="checkbox"
                id="Temperatura"
                checked={categories.Temperatura}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Temperatura">
                Temperatura
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="PH"
                type="checkbox"
                id="PH"
                checked={categories.PH}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="PH">
                PH
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Dureza"
                type="checkbox"
                id="Dureza"
                checked={categories.Dureza}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Dureza">
                Dureza(Alcalinidad:CaCO3)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Magnesio"
                type="checkbox"
                id="Magnesio"
                checked={categories.Magnesio}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Magnesio">
                Magnesio(Mg)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Manganeso"
                type="checkbox"
                id="Manganeso"
                checked={categories.Manganeso}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Manganeso">
                Manganeso(Mn)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Calcio"
                type="checkbox"
                id="Calcio"
                checked={categories.Calcio}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Calcio">
                Calcio
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="CO2"
                type="checkbox"
                id="CO2"
                checked={categories.CO2}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="CO2">
                Dioxido de Carbono (CO2)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Amonio1"
                type="checkbox"
                id="Amonio1"
                checked={categories.Amonio1}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Amonio1">
                Amonio Total
              </label>
            </div>
          </div>

          <div className="col">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Amonio2"
                type="checkbox"
                id="Amonio2"
                checked={categories.Amonio2}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Amonio2">
                Amonio(NH3: no ionizado)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Nitritos"
                type="checkbox"
                id="Nitritos"
                checked={categories.Nitritos}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Nitritos">
                Nitritos(NO2)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Fosfatos"
                type="checkbox"
                id="Fosfatos"
                checked={categories.Fosfatos}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Fosfatos">
                Fosfatos(PO4)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Fosforo1"
                type="checkbox"
                id="Fosforo1"
                checked={categories.Fosforo1}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Fosforo1">
                Fosforo Total
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Fosforo2"
                type="checkbox"
                id="Fosforo2"
                checked={categories.Fosforo2}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Fosforo2">
                Fosforo Soluble
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Sulfuro"
                type="checkbox"
                id="Sulfuro"
                checked={categories.Sulfuro}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Sulfuro">
                Sulfuro de Hidrogeno
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="HCN"
                type="checkbox"
                id="HCN"
                checked={categories.HCN}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="HCN">
                Acido Cianhidrico(HCN)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Metano"
                type="checkbox"
                id="Metano"
                checked={categories.Metano}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Metano">
                Gas Metano
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Cadmio"
                type="checkbox"
                id="Cadmio"
                checked={categories.Cadmio}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Cadmio">
                Cadmio
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Cloro"
                type="checkbox"
                id="Cloro"
                checked={categories.Cloro}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Cloro">
                Cloro
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Cobre"
                type="checkbox"
                id="Cobre"
                checked={categories.Cobre}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Cobre">
                Cobre(Cu)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Cromo"
                type="checkbox"
                id="Cromo"
                checked={categories.Cromo}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Cromo">
                Cromo(Cr)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Hierro"
                type="checkbox"
                id="Hierro"
                checked={categories.Hierro}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Hierro">
                Hierro(Fe)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Mercurio"
                type="checkbox"
                id="Mercurio"
                checked={categories.Mercurio}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Mercurio">
                Mercurio(Hg)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Niquel"
                type="checkbox"
                id="Niquel"
                checked={categories.Niquel}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Niquel">
                Niquel(Ni)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Plomo"
                type="checkbox"
                id="Plomo"
                checked={categories.Plomo}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Plomo">
                Plomo(Pb)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Turbidez"
                type="checkbox"
                id="Turbidez"
                checked={categories.Turbidez}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Turbidez">
                Turbidez(Disco Secchi)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Solidos"
                type="checkbox"
                id="Solidos"
                checked={categories.Solidos}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Solidos">
                Solidos disuelto
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Sulfatos"
                type="checkbox"
                id="Sulfatos"
                checked={categories.Sulfatos}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Sulfatos">
                Sulfatos
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                name="Zinc"
                type="checkbox"
                id="Zinc"
                checked={categories.Zinc}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="Zinc">
                Zinc
              </label>
            </div>
          </div>
          </div>
          <div>
          <Boton
            className="btn btn-primary"
            text="Registrar WQ"
            onClickCustom={(e) => {setRegistrar(true), setEnviandoDatos(true);}}
          />
        </div>
        </div>  
          ):null}
      


      {registrar && enviandoDatos === true ? (
        <div className="col">
          <div className="row">
            <div id="registrarWQ">Registrar WQ</div>
          </div>
          <div className="row" id="forms">
            <Lista
              onInit={(e) => setEstanque(e)}
              placeholder={"seleciona el estanque"}
              onChange={(e) => setEstanque(e.target.value)}
              value={estanque}
              apiURL="http://127.0.0.1:5000/consultarestanque"
            ></Lista>
            <Form
              value={nitrogeno}
              onChange={(e) => setNitrogeno(e.target.value)}
              placeholder="Niveles de nitrogeno"
            />
            <Form
              value={Oxigeno}
              onChange={(e) => setOxigeno(e.target.value)}
              placeholder="Niveles de Oxigeno"
            />
            <Form
              value={Sulfuro}
              onChange={(e) => setSulfuro(e.target.value)}
              placeholder="Niveles de Sulfuro"
            />
            <Form
              value={nitratos}
              onChange={(e) => setNitratos(e.target.value)}
              placeholder="Niveles de Nitratos"
            />
            <textarea
              className="form-control"
              value={Informacion}
              onChange={(e) => setInformacion(e.target.value)}
              placeholder="Ingresa una descripcion de la inpeccion visual del estanque"
              rows="3"
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
            <Boton
              onClickCustom={enviardatos}
              id="ingresar"
              className="btn btn-primary"
              text="Ingresar"
            /></div>
            <div className="col">
            <Boton onClickCustom={() => setEnviandoDatos(false)} className="btn btn-primary" text="Cambiar parametros"></Boton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WQ;
