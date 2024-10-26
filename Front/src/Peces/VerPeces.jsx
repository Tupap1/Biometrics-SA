import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/ui/Form';
import Lista from '../components/ui/Lista';
import Boton from '../components/ui/Boton';



function VerPeces() {
  const [Datos, setDatos] = useState([]);
  const [nombrepez, setnombrepez] = useState("");
  const [cantidadsemilla,setcantidadsemilla] = useState("");
  const [unidad, setUnidad]= useState("")
  const [PezSeleccionado, setPezSeleccionado] = useState([cantidadsemilla, nombrepez, unidad]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDatos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/consultarpeces');
      setDatos(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al consultar peces');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/consultarpeces");
      const matchingpez = response.data.find((pez) => pez.id === parseInt(PezSeleccionado));
      setUnidad(pez.unidad);
      setnombrepez(pez.label);
      setcantidadsemilla(pez.cantidadSemilla);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchDatos();
  }, []);

  const handleEdit = (dato) => {
    setPezSeleccionado(dato);
    setIsEditing(true);
  };

  const pezdata = {
    nombrepez:nombrepez,
    cantidadsemilla:cantidadsemilla,
    unidad:unidad
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/biometria/${biometriaSeleccionada.id}`, Biometria);
      console.log(response);
      alert('Datos del pez editados con éxito');
      setIsEditing(false);
      fetchDatos();
    } catch (error) {
      console.error(error);
      alert('Error al editar datos del pez');
    }
  };

  const handleCancelEdit = () => {
    setPezSeleccionado(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Peces</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre pez</th>
            <th>cantidad de semilla</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.label}</td>
              <td>{dato.cantidadSemilla}{dato.unidad}</td> 
  
              <td>
                <Boton className='btn btn-primary' text='editar' onClickCustom={"hola"}></Boton>
                <button onClick={() => {handleEdit(dato); fetchData();}}>Editar</button>
                <Boton text='Detalles'></Boton>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isEditing && (
        <div>
          <h2>Editando Datos pez {PezSeleccionado.id}</h2>
            <Form placeholder='Nombrepez'></Form>

          
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}

      <Boton className='btn btn-primary' to='/Biometria' text='+'></Boton>
    </div>
  );
}

export default VerPeces;