import React, { useState } from 'react';

const RegistroEstanque = () => {
  const [amonio, setAmonio] = useState('');
  const [oxigeno, setOxigeno] = useState('');
  const [ph, setPh] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [registros, setRegistros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      amonio,
      oxigeno,
      ph,
      temperatura,
    };
    setRegistros([...registros, nuevoRegistro]);
    setAmonio('');
    setOxigeno('');
    setPh('');
    setTemperatura('');
  };

  return (
    <div>
      <h2>Registro de Estanque de Peces</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nivel de Amonio:</label>
          <input type="number" value={amonio} onChange={(e) => setAmonio(e.target.value)} required />
        </div>
        <div>
          <label>Nivel de Oxígeno:</label>
          <input type="number" value={oxigeno} onChange={(e) => setOxigeno(e.target.value)} required />
        </div>
        <div>
          <label>Nivel de pH:</label>
          <input type="number" value={ph} onChange={(e) => setPh(e.target.value)} step="0.1" required />
        </div>
        <div>
          <label>Temperatura (°C):</label>
          <input type="number" value={temperatura} onChange={(e) => setTemperatura(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>

      {registros.length > 0 && (
        <div>
          <h3>Registros de Estanque</h3>
          <table>
            <thead>
              <tr>
                <th>Nivel de Amonio</th>
                <th>Nivel de Oxígeno</th>
                <th>Nivel de pH</th>
                <th>Temperatura (°C)</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index}>
                  <td>{registro.amonio}</td>
                  <td>{registro.oxigeno}</td>
                  <td>{registro.ph}</td>
                  <td>{registro.temperatura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistroEstanque;
