import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Boton from './Boton';

function GetApiData({apiURL, Consulta1}) {
const [datos, setdatos] = useState("");


useEffect(() =>{
    const getdata = async () => {
    try {
        const response = await axios.get(apiURL);
        setdatos(response.data);
    } catch(error){
        console.error("Error", error);
    }
    };

    getdata();
}, []);


  return (
    <div>
        <h5>{JSON.stringify(datos)}</h5>
    </div>
  )
}

export default GetApiData