import React, { useTransition } from 'react'
import { useState } from 'react'
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
  const [hora, sethora] = useState("");


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
      <Lista onChange={(e) => {setEstanque (e.target.value);} } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista>
      <label htmlFor="">Seleciona el tipo de alimento</label>
      <Lista onChange={(e) => {setAlimento (e.target.value); } } apiURL="http://127.0.0.1:5000/veralimentos"></Lista>
      <Form type='number' value={cantidad} onChange={(e) => setcantidad(e.target.value)} placeholder='Ingresa la cantidad de alimento distribuida'></Form>
      <textarea class="form-control" value={Informacion} onChange={(e) => setInformacion(e.target.value)} placeholder="Ingresa una descripcion de la jornada de alimencaion" rows="3"></textarea>
      <Boton text='Crear Alimentacion' className='btn btn-primary' onClickCustom={enviardatos}></Boton>
    </div>
  )
}

export default RegistrarAlimentacion