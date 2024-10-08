import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {

  const [estanqueSeleccionado, setEstanqueSeleccionado] = useState('');
  const [tamanoMuestra, setTamanoMuestra] = useState('');
  const [error, setError] = useState(null);


  const estanques = [
    { id: '1', nombre: 'Estanque 1' },
    { id: '2', nombre: 'Estanque 2' },
    { id: '3', nombre: 'Estanque 3' },
  ];


  const handleEstanqueChange = (event) => {
    setEstanqueSeleccionado(event.target.value);
  };


  const handleTamanoMuestraChange = (event) => {
    setTamanoMuestra(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!estanqueSeleccionado || !tamanoMuestra) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const fechaHora = new Date().toISOString(); 
    const nuevoDato = {
      id_estanque: estanqueSeleccionado,
      fecha: fechaHora.split('T')[0], 
      hora: fechaHora.split('T')[1].split('.')[0],
      tamano_muestra: tamanoMuestra,
    };

    try {
     
      await axios.post('http://localhost:5000/agregar_biometria', nuevoDato);
      alert('Datos enviados exitosamente');
      
      setEstanqueSeleccionado('');
      setTamanoMuestra('');
      setError(null);
    } catch (err) {
      setError('Error al enviar los datos a la API');
    }
  };

  return (
    <div>
      <h1>Formulario de Selección</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Seleccione el Estanque:
            <select value={estanqueSeleccionado} onChange={handleEstanqueChange}>
              <option value="">Seleccione un estanque</option>
              {estanques.map((estanque) => (
                <option key={estanque.id} value={estanque.id}>
                  {estanque.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Tamaño de Muestra:
            <select value={tamanoMuestra} onChange={handleTamanoMuestraChange}>
              <option value="">Seleccione un tamaño de muestra</option>
              <option value="5%">5%</option>
              <option value="10%">10%</option>
            </select>
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Formulario;
