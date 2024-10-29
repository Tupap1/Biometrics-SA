import React from 'react'
import Card from '../components/ui/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Boton from '../components/ui/Boton';

function VerEstanques() {
const [datos, setDatos] = useState([]);
const [estanque, setEstanque] = useState("1");
const [isEditing,setIsEditing] = useState(false)
const [estanqueSeleccionado, setEstanqueSeleccionado] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/consultarestanque");
      setDatos(response.data);
    } catch (error) {
      console.error("Error:", error);

    }
  };

  fetchData();
}, []);

const renderDatos = () => {
  if (datos.length === 0) {
    return <p>cargando Datos...</p>;
  }

  return datos.map((dato) => (
    <div key={dato.id} className="card">
      <img className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{dato.nombreEstanque}</h5>
        <p className="card-text">
          {dato.nombre_pez} ({dato.tamanoEstanque}m2)

        </p>
        <Boton 
        to={`/editarestanque/${dato.id}`}  onClick={() => handleEstanqueClick(dato.id)} className="btn btn-primary" onClickCustom={""}  text={"Ver Estanque"} />

      </div>
    </div>
  ));
};


const handleEstanqueClick = (id) => {
  setEstanque(id);
};

const estanquedata = {
  idestanque:estanque
}

const handleSaveEdit = async () => {
  try {
    const response = await axios.put(`http://127.0.0.1:5000/editarestanque/${estanque.id}`, estanquedata);
    console.log(response);
    alert('estanque editado con éxito');
    setIsEditing(false);
    fetchBiometrias();
  } catch (error) {
    console.error(error);
    alert('Error al editar estanque');
  }
};


  return (
    <div>
      <div><h1>consultar Estanques</h1></div>
    <div>{renderDatos()}</div>
    <Boton className='btn btn-primary' to='/RegistrarEstanques' text='+'></Boton>
    </div>)
}

export default VerEstanques