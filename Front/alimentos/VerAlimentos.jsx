import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../src/components/ui/Form';
import Lista from '../src/components/ui/Lista';
import Boton from '../src/components/ui/Boton';



function VerAlimentos() {
  const [Datos, setDatos] = useState([]);
  const [nombrealimento, setnombrealimento] = useState("");
  const [cantidad,setcantidad] = useState("");
  const [unidad, setUnidad]= useState("")
  const [idalimento, setidalimento]  = useState ("")
  const [alimentoseleccionado, setalimentoseleccionado] = useState([cantidad, nombrealimento, unidad]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDatos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/veralimentos');
      setDatos(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al consultar alimentos');
    }
  };

  const fetchData = async () => {
    if (!alimentoseleccionado) return;
    try {
      const response = await axios.get("http://127.0.0.1:5000/consultarpeces");
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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/borraralimento/${id}`);
        alert("Alimento eliminado con éxito");
        fetchDatos();
        setIsEditing(false)
      } catch (error) {
        console.error(error);
        alert("Error al eliminar el alimento");
      }
    }
  };



  return (
    <div>
      <h2>Alimentos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre pez</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombrealimento}</td>
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

          
          <button className='btn btn-primary' onClick={handleSaveEdit}>Guardar</button>
          <button className='btn btn-primary' onClick={handleCancelEdit}>Cancelar</button>
          <Boton className="btn btn-danger"    text="eliminar"  onClickCustom={() => handleDelete(alimentoseleccionado.id)}></Boton>
        </div>
      )}

      <Boton className='btn btn-primary' to='/CrearAlimento' text='+'></Boton>
    </div>
  );
}

export default VerAlimentos;