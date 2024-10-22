import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Biometria() {
    const { id } = useParams();
    const [biometria, setBiometria] = useState(null);
  
    useEffect(() => {

      axios.get(`http://127.0.0.1:5000/biometria/${id}`)
        .then(response => {
          setBiometria(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la biometría:', error);
        });
    }, [biometriaId]);
  
    return (
      <div>

        {biometria ? (
          <div>
            <h2>Detalles de la Biometría</h2>
            <p>Nombre del estanque: {biometria.nombreEstanque}</p>

          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    );
  }
export default Biometria