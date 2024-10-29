import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/ui/Form';
import Lista from '../components/ui/Lista';
import Boton from '../components/ui/Boton';


function VerBiometrias() {
  const [biometrias, setBiometrias] = useState([]);
  const [estanque, setEstanque] = useState("");
  const [muestra,setMuestra] = useState("");
  const [biometriaSeleccionada, setBiometriaSeleccionada] = useState([estanque, muestra]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchBiometrias = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/consultarbiometrias');
      setBiometrias(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al consultar biometrias');
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/borrarbiometria/${id}`);
        alert("Biometria eliminada con éxito");
        fetchBiometrias();
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        alert("Error al eliminar la Biometria");
      }
    }
  };


  useEffect(() => {
    fetchBiometrias();
  }, []);

  const handleEdit = (biometria) => {
    setBiometriaSeleccionada(biometria);
    setIsEditing(true);
  };

  const Biometria = {
    idestanque:estanque,
    tamanomuestra:muestra
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/biometria/${biometriaSeleccionada.id}`, Biometria);
      console.log(response);
      alert('Biometria editada con éxito');
      setIsEditing(false);
      fetchBiometrias();
    } catch (error) {
      console.error(error);
      alert('Error al editar biometria');
    }
  };

  const handleCancelEdit = () => {
    setBiometriaSeleccionada(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Biometrías</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estanque</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Peso</th>
            <th>Longitud</th>
            <th>Biomasa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {biometrias.map((biometria) => (
            <tr key={biometria.id}>
              <td>{biometria.id}</td>
              <td>{biometria.nombreEstanque}</td>
              <td>{biometria.fecha}</td>
              <td>{biometria.hora}</td>
              <td>{biometria.peso}</td>
              <td>{biometria.longitud}</td>
              <td>{biometria.cantidad_biomasa}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(biometria)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isEditing && (
        <div>
          <h2>Editando Biometria {biometriaSeleccionada.id}</h2>
          <label htmlFor="">Seleciona el nuevo estanque</label>
          <Lista value={estanque} onChange={(e) => setEstanque (e.target.value) } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista>
          <label htmlFor="">Seleciona el tamaño de la muestra</label>
          <select className='form-select' value={muestra} onChange={(e) => setMuestra(e.target.value)}>
        <option value="5">5%</option>
        <option value="10">10%</option>          
      </select>
          
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
          <Boton className="btn btn-danger"  text="eliminar" onClickCustom={() => handleDelete(biometriaSeleccionada.id)}></Boton>
        </div>
      )}

      <Boton className='btn btn-primary' to='/Biometria' text='+'></Boton>
    </div>
  );
}

export default VerBiometrias;