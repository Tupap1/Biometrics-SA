import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../components/ui/Card';
import Boton from '../components/ui/Boton';

function VerBiometriasCard({title, fecha, hora}) {

    const [datos, setDatos] = useState([]);


  useEffect(() => {
    const getdatos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/consultarbiometrias");
            setDatos(response.data);
        }
        catch(error){
            console.error("error", error);
        } 
    };
    getdatos();
    console.log(datos)
  }, [] );
  
  
    return  datos.map((dato) => (
      <div key={dato.id} className='card'>
        <div className='card-body'>
        <h5 className='card-title'>{dato[title]}</h5>
        <p className='card-text'>
          {dato[fecha]}
          {dato[hora]}
        </p>
        </div>
        <Boton text='Ver Biometria'></Boton>
      </div>));
      
       

        
    
}

export default VerBiometriasCard