import React from 'react'
import Card from '../components/ui/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';

function VerEstanques() {
const [datos, setDatos] = useState("");

const ConsultarEstanques = async () => {
  try{
    const response = axios.get("")
  }
 catch{
  
 }
}

  useEffect(() =>{

  }, []);



  return (
    <div>
      <div><h1>consultar Estanques</h1></div>
    <div><Card info={"nombre_pez"} title={"nombreEstanque"} textboton={"ver Estanque"}  apiURL={'http://127.0.0.1:5000/consultarestanque'}/></div>
    </div>)
}

export default VerEstanques