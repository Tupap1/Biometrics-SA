import React from 'react';
import { useNavigate } from 'react-router-dom';

function Volver() {
  const navigate = useNavigate();

  return (
    <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Volver</button>   

  );
}

export default Volver;