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
  const [idpez, setidpez]  = useState ("")
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
    if (!PezSeleccionado) return;
    try {
      const response = await axios.get("http://127.0.0.1:5000/consultarpeces");
      const matchingpez = response.data.find((pez) => pez.id === parseInt(PezSeleccionado));
      console.log(matchingpez)
      setUnidad(PezSeleccionado.unidad)
      setcantidadsemilla(PezSeleccionado.cantidadSemilla)
      setnombrepez(PezSeleccionado.label)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchDatos();
    if (PezSeleccionado) {
      fetchData();
    }
  }, [PezSeleccionado]);


  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/borrarpez/${id}`);
        alert("Pez eliminado con éxito");
        fetchDatos();
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        alert("Error al eliminar Pez");
      }
    }
  };



  const handleEdit = (dato) => {
    setidpez(dato.id);
    setPezSeleccionado(dato);
    fetchData();
    setIsEditing(true);
    console.log("editando")
    console.log(idpez)
  };

  const pezdata = {
    nombrepez:nombrepez,
    cantidadsemilla:cantidadsemilla,
    unidad:unidad
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/peces/${PezSeleccionado.id}`, pezdata);
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
                <Boton className='btn btn-primary' text='editar' onClickCustom={(e) => { fetchData(); handleEdit(dato); }}></Boton>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isEditing && (
        <div>
          <h2>Editando Datos pez {PezSeleccionado.id}</h2>
            <Form value={nombrepez} onChange={(e) => setnombrepez(e.target.value)} placeholder='Nombre pez'></Form>
            <Form value={cantidadsemilla} onChange={(e) => setcantidadsemilla(e.target.value)} placeholder='Cantidad semilla'></Form>
            <Form placeholder='Unidad' value={unidad} onChange={(e) => {setUnidad(e.target.value); setUnidad(e.target.value.toUpperCase())}}></Form>

          
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
          <Boton className="btn btn-danger"    text="eliminar"  onClickCustom={() => handleDelete(PezSeleccionado.id)}></Boton>
        </div>
      )}

      <Boton className='btn btn-primary' to='/Crearpeces' text='+'></Boton>
    </div>
  );
}

export default VerPeces;