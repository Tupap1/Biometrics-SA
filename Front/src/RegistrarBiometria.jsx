import React, { useState } from 'react';

const RegistroBiometria = () => {
    const [peso, setPeso] = useState('');
    const [longitud, setLongitud] = useState('');
    const [registros, setRegistros] = useState([]);
    const [pesoPromedio, setPesoPromedio] = useState(null);
    const [longitudPromedio, setLongitudPromedio] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoRegistro = { peso: parseFloat(peso), longitud: parseFloat(longitud) };
        setRegistros([...registros, nuevoRegistro]);
        setPeso('');
        setLongitud('');
        calcularPromedios([...registros, nuevoRegistro]);
    };

    const calcularPromedios = (todosLosRegistros) => {
        const totalPeso = todosLosRegistros.reduce((acc, registro) => acc + registro.peso, 0);
        const totalLongitud = todosLosRegistros.reduce((acc, registro) => acc + registro.longitud, 0);
        
        const pesoPromedio = totalPeso / todosLosRegistros.length;
        const longitudPromedio = totalLongitud / todosLosRegistros.length;

        setPesoPromedio(pesoPromedio);
        setLongitudPromedio(longitudPromedio);
        enviarPromedios(pesoPromedio, longitudPromedio);
    };

    const enviarPromedios = async (pesoPromedio, longitudPromedio) => {
        try {
            const response = await fetch('https://tu-backend.com/api/peso-longitud-promedio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pesoPromedio, longitudPromedio }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar los promedios');
            }

            console.log('Promedios enviados:', { pesoPromedio, longitudPromedio });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Registro de Biometría</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Ingresar Peso (g):
                        <input
                            type="number"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Ingresar Longitud (mm):
                        <input
                            type="number"
                            value={longitud}
                            onChange={(e) => setLongitud(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Registrar</button>
            </form>

            <h2>Registros</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Peso (g)</th>
                            <th>Longitud (mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{registro.peso}</td>
                                <td>{registro.longitud}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pesoPromedio !== null && (
                <h3>Peso Promedio: {pesoPromedio.toFixed(2)} g</h3>
            )}
            {longitudPromedio !== null && (
                <h3>Longitud Promedio: {longitudPromedio.toFixed(2)} mm</h3>
            )}
        </div>
    );
};

export default RegistroBiometria;
