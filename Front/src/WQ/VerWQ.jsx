import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Lista from '../components/ui/Lista';
import Boton from '../components/ui/Boton';
import Form from '../components/ui/Form';

function VerWQ() {

  const [datos, setDatos] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [wqseleccionada, setwqseleccionada] = useState("");
  const [estanque, setEstanque] = useState("");



  const consultarwq = async () => {  
    try {
      const response = await axios.get('http://127.0.0.1:5000/consultarwq');
      setDatos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
      alert('Error al consultar biometrias');
    }
  };

  useEffect(() => {
    consultarwq();
  }, []);


  const datoswq  = {
    
    idestanque:estanque
  } 
  const handleEdit = (wq) => {
    setwqseleccionada(wq);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/wq/${wqseleccionada.id}`, datoswq);
      console.log(response);
      alert('WQ editada con éxito');
      setIsEditing(false);
      consultarwq();
    } catch (error) {
      console.error(error);
      alert('Error al editar WQ');
    }
  };

  const handleCancelEdit = () => {
    setwqseleccionada(null);
    setIsEditing(false);
  };



  
  return (
    <div>
    
          <div>
      <h2>Registros WQ</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estanque</th>
            <th>Fecha</th>
            <th>Hora</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((wq) => (
            <tr key={wq.id}>
              <td>{wq.id}</td>
              <td>{wq.nombreEstanque}</td>
              <td>{wq.fecha}</td>
              <td>{wq.hora}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(wq)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isEditing && (
        <div>
          <h2>Editando registro WQ {wqseleccionada.id}</h2>
          <label htmlFor="">Seleciona el nuevo estanque</label>
          <Lista value={estanque} onChange={(e) => setEstanque (e.target.value) } apiURL="http://127.0.0.1:5000/consultarestanque"></Lista>
                    
          <button className='btn btn-primary' onClick={handleSaveEdit}>Guardar</button>
          <button className='btn btn-danger' onClick={handleCancelEdit}>Cancelar</button>
        </div>
        )
}
<Boton className='btn btn-primary' to='/WQ' text='+'></Boton>
    </div>
    </div>)
}
export default VerWQ