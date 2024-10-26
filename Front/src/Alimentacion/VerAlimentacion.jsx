import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/ui/Form';
import Boton from '../components/ui/Boton';
import Lista from '../components/ui/Lista';



function VerAlimentacion() {
  const [Datos, setDatos] = useState([]);
  const [nombrealimento, setnombrealimento] = useState("");
  const [cantidad,setcantidad] = useState("");
  const [unidad, setUnidad]= useState("")
  const [idalimento, setidalimento]  = useState ("")
  const [alimentoseleccionado, setalimentoseleccionado] = useState([cantidad, nombrealimento, unidad]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDatos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/veralimentacion');
      setDatos(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al consultar alimentos');
    }
  };

  const fetchData = async () => {
    if (!alimentoseleccionado) return;
    try {
      const response = await axios.get("http://127.0.0.1:5000/veralimentacion");
      const matchingalimento = response.data.find((pez) => pez.id === parseInt(alimentoseleccionado));
      console.log(matchingalimento)
      setUnidad(alimentoseleccionado.unidad)
      setcantidad(alimentoseleccionado.cantidad)
      setnombrealimento(alimentoseleccionado.nombrealimento)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchDatos();
    if (alimentoseleccionado) {
      fetchData();
    }
  }, [alimentoseleccionado]);


  const handleEdit = (dato) => {
    setidalimento(dato.id);
    setalimentoseleccionado(dato);
    fetchData();
    setIsEditing(true);
    console.log("editando")
    console.log(idalimento)
  };

  const alimentodata = {
    nombrealimento:nombrealimento,
    cantidad:cantidad,
    unidad:unidad
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/alimento/${alimentoseleccionado.id}`, alimentodata);
      console.log(response);
      alert('Aliemento editado con éxito');
      setIsEditing(false);
      fetchDatos();
    } catch (error) {
      console.error(error);
      alert('Error al editar alimento');
    }
  };

  const handleCancelEdit = () => {
    setalimentoseleccionado(null);
    setIsEditing(false);
  };





  return (
    <div>
      <h2>Alimentaciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estanque</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombreestanque}</td>
              <td>{dato.cantidad} {dato.unidad}</td> 
  
              <td>
                <Boton className='btn btn-primary' text='editar' onClickCustom={(e) => { fetchData(); handleEdit(dato); }}></Boton>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isEditing && (
        <div>
          <h2>Editando Alimento "{alimentoseleccionado.nombrealimento}"</h2>
            <Form value={nombrealimento} onChange={(e) => setnombrealimento(e.target.value)} placeholder='Nombre Alimento'></Form>
            <Form value={cantidad} onChange={(e) => setcantidad(e.target.value)} placeholder='Cantidad Alimento'></Form>
            <Form placeholder='Unidad' value={unidad} onChange={(e) => {setUnidad(e.target.value); setUnidad(e.target.value.toUpperCase())}}></Form>

          
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      )}

      <Boton className='btn btn-primary' to='/CrearAlimento' text='+'></Boton>
    </div>
  );
}

export default VerAlimentacion;