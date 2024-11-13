import React, { useState, useEffect } from 'react';

function CapturarFecha({}) {
  const [fechaActual, setFechaActual] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaActual(new Date());
    }, 1000); 

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      {fechaActual.toLocaleDateString()}
    </div>
  );
}

export default CapturarFecha;