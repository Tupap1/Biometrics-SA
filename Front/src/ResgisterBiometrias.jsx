import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  // Estado para manejar los inputs
  const [peso, setPeso] = useState('');
  const [longitud, setLongitud] = useState('');
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Manejar el cambio en el input de peso
  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  // Manejar el cambio en el input de longitud
  const handleLongitudChange = (event) => {
    setLongitud(event.target.value);
  };

  // Función para calcular el peso promedio
  const calcularPesoPromedio = () => {
    if (datos.length === 0) return 0;
    const totalPeso = datos.reduce((total, item) => total + parseFloat(item.peso), 0);
    return totalPeso / datos.length;
  };

  // Función para calcular la longitud promedio
  const calcularLongitudPromedio = () => {
    if (datos.length === 0) return 0;
    const totalLongitud = datos.reduce((total, item) => total + parseFloat(item.longitud), 0);
    return totalLongitud / datos.length;
  };

  // Manejar el clic en el botón para guardar y mostrar la tabla
  const handleAgregarDatos = async () => {
    if (peso && longitud) {
      const fechaHora = new Date().toISOString();  // Fecha y hora actuales en formato ISO
      
      const nuevoDato = {
        fecha: fechaHora.split('T')[0], // Solo la fecha en formato 'YYYY-MM-DD'
        hora: fechaHora.split('T')[1].split('.')[0], // Solo la hora en formato 'HH:MM:SS'
        peso,
        longitud
      };
      
      try {
        // Enviar datos a la API
        await axios.post('http://localhost:5000/agregar_biometria', nuevoDato);
        // Actualizar los datos de la tabla
        setDatos([...datos, { id: datos.length + 1, ...nuevoDato }]);
        // Limpiar los campos de entrada después de agregar los datos
        setPeso('');
        setLongitud('');
        setError(null);
      } catch (err) {
        setError('Error al enviar los datos a la API');
      }
    } else {
      alert('Por favor, ingrese ambos valores');
    }
  };

  return (
    <div>
      <h1>Ingrese Peso y Longitud</h1>
      <div>
        <label>
          Peso:
          <input
            type="number"
            value={peso}
            onChange={handlePesoChange}
            placeholder="Ingrese el peso"
          />
        </label>
      </div>
      <div>
        <label>
          Longitud:
          <input
            type="number"
            value={longitud}
            onChange={handleLongitudChange}
            placeholder="Ingrese la longitud"
          />
        </label>
      </div>
      <button onClick={handleAgregarDatos}>Agregar a Lista</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Lista de Resultados</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Peso</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>{item.hora}</td>
                <td>{item.peso}</td>
                <td>{item.longitud}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3>Promedio de Peso: {calcularPesoPromedio().toFixed(2)}</h3>
          <h3>Promedio de Longitud: {calcularLongitudPromedio().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Register;
