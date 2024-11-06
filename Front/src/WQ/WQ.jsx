  import React from "react";
  import Form from "../components/ui/Form";
  import "../components/styles/WQ.css";
  import Lista from "../components/ui/Lista";
  import Boton from "../components/ui/Boton";
  import { useState, useEffect } from "react";
  import axios from "axios";



  function WQ() {

  const [estanque, setEstanque] = useState("")
  const [nitrogeno, setNitrogeno] = useState("")
  const [Oxigeno, setOxigeno] = useState("")
  const [Sulfuro, setSulfuro] = useState("")
  const [nitratos, setNitratos] = useState("")
  const [Informacion, setInformacion] = useState("")
  const [hora, setHora] = useState("");
  const [fecha, setfecha] = useState("");



  
    useEffect(() => {
        const intervalo = setInterval(() => {
          const fechaactual = (new Date().toLocaleDateString());
    
          const [dia, mes, año] = fechaactual.split('/');
          const fechaFormateada = `${año}:${mes}:${dia}` 
    
          setfecha(fechaFormateada)
          setHora(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second:"2-digit", hour12: false  }));
        }, 1000); 
    
  
      return () => clearInterval(intervalo);
    }, []);
  



  const datos ={ 
    idestanque:estanque,
    Nitrogeno:nitrogeno,
    Oxigeno: Oxigeno,
    Sulfuro:Sulfuro,
    Nitratos:nitratos,
    Informacion:Informacion,
    hora:hora,
    fecha:fecha

  } 

  const enviardatos = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/WQ', datos);
        console.log(response.data);
        alert("Datos Guardados con exito")
        setEstanque(1)
        setInformacion("")
        setNitratos("")
        setNitrogeno("")
        setOxigeno("")
        setSulfuro("")
    } catch (error) {
        console.error(error);
    }
};

    return (
      <div className="col">
      <div className="row">
        <div id="registrarWQ">Registrar WQ</div>
      </div>
        <div className="row" id="forms">

          <Lista placeholder={"seleciona el estanque"} onChange={(e) => setEstanque (e.target.value) } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista>
          <Form value={nitrogeno} onChange={(e) => setNitrogeno(e.target.value)} placeholder="Niveles de nitrogeno" />
          <Form value={Oxigeno} onChange={(e) => setOxigeno(e.target.value)} placeholder="Niveles de Oxigeno" />
          <Form value={Sulfuro} onChange={(e) => setSulfuro(e.target.value)} placeholder="Niveles de Sulfuro" />
          <Form value={nitratos} onChange={(e) => setNitratos(e.target.value)} placeholder="Niveles de Nitratos" />
          <textarea className="form-control" value={Informacion} onChange={(e) => setInformacion(e.target.value)} placeholder="Ingresa una descripcion de la inpeccion visual del estanque" rows="3"></textarea>
        </div>  
        <div className="ingresar"><Boton onClickCustom={enviardatos}  id="ingresar" className="ingresar" text="Ingresar"/></div>

      </div>
    );
  }

  export default WQ;
