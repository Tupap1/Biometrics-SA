import React, { useTransition } from 'react'
import { useState,useEffect } from 'react'
import Boton from '../components/ui/Boton'
import Form from '../components/ui/Form'
import Lista from '../components/ui/Lista'
import axios from 'axios'

function RegistrarAlimentacion() {
  const [Estanque, setEstanque] = useState("");
  const [Alimento, setAlimento] = useState("");
  const [Informacion, setInformacion] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [fecha, setfecha] = useState("");
  const [alimentodisponible, setAlimentodisponible] = useState("")
  const [unidad, setUnidadalimento] = useState("")
  const [hora, setHora] = useState("");
  const [cargando, setCargando] = useState(false);
  

  useEffect(() => {
    const intervalo = setInterval(() => {
      const fechaactual = (new Date().toLocaleDateString());

      const [dia, mes, año] = fechaactual.split('-');
      const fechaFormateada = `${año}:${mes}:${dia}`
      setfecha(fechaFormateada)
      setHora(new Date().toLocaleTimeString());
    }, 1000); 

    return () => clearInterval(intervalo);
  }, []);
  



  const consultarcantidadalimento = async () => {
    setCargando(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/veralimentos");
      const matchingalimento = response.data.find((ali) => ali.id === parseInt(Alimento));

      if (matchingalimento) {
        setAlimentodisponible(matchingalimento.cantidad);
        setUnidadalimento(matchingalimento.unidad);
      } else {
        console.error(`Alimento con ID ${Alimento} no encontrado`);
      }
    } catch (error) {
      console.error('Error al consultar la cantidad de alimento:', error);
    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
    if (Alimento) {
      consultarcantidadalimento();
    }
  }, [Alimento]);

  const datos = {
    id_estanque:Estanque,
    idAlimento:Alimento,
    cantidad:cantidad,
    fecha:fecha,
    hora:hora,
    observaciones:Informacion
  }
  

  const enviardatos = async (e) =>{
    try{
      const response = await axios.post("http://127.0.0.1:5000/crearalimentacion", datos)
      console.log(response.data)
      alert("datos creados correctamente")
      setInformacion("")
      setcantidad("")
      setEstanque("1")
      setAlimento("1")
    }
    catch(error){
      console.log( error)
      console.log("no se pudo crear la alimentacion")
    }
  }
  
  return (
    <div>
      <h1>Registar alimentacion</h1>
      <label htmlFor="">Seleciona el estanque de la alimentacion</label>
      <Lista placeholder={"seleciona el estanque"} onChange={(e) => {setEstanque (e.target.value);} } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista>
      <label htmlFor="">Seleciona el tipo de alimento</label>
      <Lista onChange={(e) => {setAlimento (e.target.value); consultarcantidadalimento(e.target.value); } } apiURL="http://127.0.0.1:5000/veralimentos"></Lista>

      <div>

      {cargando && <p>Cargando...</p>}
      {cantidad && <p>Cantidad disponible: {alimentodisponible} {unidad}</p>}
    </div>
      <Form min={"0"} max={alimentodisponible} type='number' value={cantidad} onChange={(e) => setcantidad(e.target.value)} placeholder='Ingresa la cantidad de alimento distribuida'  ></Form>
      <textarea className="form-control" value={Informacion} onChange={(e) => setInformacion(e.target.value)} placeholder="Ingresa una descripcion de la jornada de alimencaion" rows="3"></textarea>
      <Boton text='Crear Alimentacion' className='btn btn-primary' onClickCustom={enviardatos}></Boton>
    </div>
  )
}

export default RegistrarAlimentacion