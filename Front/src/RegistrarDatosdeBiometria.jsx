import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {
  // Estado para manejar el estanque seleccionado
  const [estanqueSeleccionado, setEstanqueSeleccionado] = useState('');
  // Estado para manejar el tamaño de muestra seleccionado
  const [tamanoMuestra, setTamanoMuestra] = useState('');
  // Estado para manejar el error
  const [error, setError] = useState(null);

  // Opciones de estanque (puedes reemplazar esto con datos dinámicos de una API)
  const estanques = [
    { id: '1', nombre: 'Estanque 1' },
    { id: '2', nombre: 'Estanque 2' },
    { id: '3', nombre: 'Estanque 3' },
  ];

  // Manejar el cambio en la selección del estanque
  const handleEstanqueChange = (event) => {
    setEstanqueSeleccionado(event.target.value);
  };

  // Manejar el cambio en el tamaño de muestra
  const handleTamanoMuestraChange = (event) => {
    setTamanoMuestra(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!estanqueSeleccionado || !tamanoMuestra) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const fechaHora = new Date().toISOString(); // Fecha y hora actuales en formato ISO
    const nuevoDato = {
      id_estanque: estanqueSeleccionado,
      fecha: fechaHora.split('T')[0], // Solo la fecha en formato 'YYYY-MM-DD'
      hora: fechaHora.split('T')[1].split('.')[0], // Solo la hora en formato 'HH:MM:SS'
      tamano_muestra: tamanoMuestra,
    };

    try {
      // Enviar datos a la API
      await axios.post('http://localhost:5000/agregar_biometria', nuevoDato);
      alert('Datos enviados exitosamente');
      // Limpiar los campos de entrada después de enviar los datos
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
