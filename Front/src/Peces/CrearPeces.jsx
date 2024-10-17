import React from 'react'
import { useState } from 'react'
import Form from '../components/ui/Form'
import Boton from '../components/ui/Boton'
import Volver from '../components/ui/Volver'
function CrearPeces() {



const [Raza,setRaza] = useState("")
const [CantidadSemilla,setCantidadSemilla] = useState("")

const data = {
    nombre_cientifico: Raza,
    cantidadSemilla: CantidadSemilla
  };


const Enviar = async (e) => {
    axios.post('http://127.0.0.1:5000/registrarpeces', data)
  .then(response => {
    console.log(response.data); 
  })
  .catch(error => {
    console.error(error); 
  });    
}

  return (


    <div>
        <div><Volver/><h1>Registrar Peces</h1></div>
        <div><Form placeholder='Ingrese el nombre de la raza' value={Raza} onChange={(e) =>setRaza(e.target.value)}/>
        <Form placeholder='Ingrese cantidad de semilla (KG)'  value={CantidadSemilla} onChange={(e) =>setCantidadSemilla(e.target.value)}/></div>
        <Boton text='Crear Raza'/>
    </div>
  )
}

export default CrearPeces