import React, { useState } from 'react';
import Form from './components/ui/Form';


function CalcularPromedio() {
  const [numeros, setNumeros] = useState([]);

  const calcularPromedio = () => {
    if (numeros.length === 0) {
      return 'El array está vacío';
    }

    const suma = numeros.reduce((total, numero) => total + numero, 0);
    const promedio = suma / numeros.length;
    return promedio;
  };

  return (
    <div>
        <Form value={numeros} placeholder='Ingresa las notas' onChange={(e) =}/>
      <p>Los números son: {numeros.join(', ')}</p>
      <p>El promedio es: {calcularPromedio()}</p>
    </div>
  );
}

export default CalcularPromedio;