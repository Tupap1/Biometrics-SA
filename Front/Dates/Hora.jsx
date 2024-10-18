import React, { useState, useEffect } from 'react';

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      {hora.toLocaleTimeString()}
    </div>
  );
}

export default Reloj;