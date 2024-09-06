import React, { useState } from 'react';
import RegistrarDatosdeBiometria from './RegistrarDatosdeBiometria'
import RegisterBiometria from './ResgisterBiometrias'
function Biometria() {
  // Estado para manejar los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState([]);
  
  // Función para manejar el envío de datos desde el formulario
  const handleDatosFormulario = (nuevoDato) => {
    setDatosFormulario([...datosFormulario, nuevoDato]);
  };

  return (
    <div>
      <h1>Formulario y Registro</h1>
      <RegistrarDatosdeBiometria onEnviarDatos={handleDatosFormulario} />
      <RegisterBiometria datos={datosFormulario} />
    </div>
  );
}

export default Biometria;
