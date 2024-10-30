import { Link } from 'react-router-dom';
import './components/styles/LandingPage.css'; 
import { useAuth0 } from "@auth0/auth0-react";
import AuthButton from './components/ui/Loginboton';
import Boton from './components/ui/Boton';

const LandingPage = () => {


  return (
    <div className="landing-container">
      <header className="header">

        <AuthButton></AuthButton>
      </header>
      <div className="logo-container">
        <img src="logo.png" alt="Biometrics SA" className="logo.png" />
      </div>

      <div className="button-container">
        <Boton to='/Biometria' className='btn btn-primary' >Registrar Biometria</Boton>
        <Boton to='/RegistrarWQ' className='btn btn-primary' >Registrar WQ</Boton>
      </div>
    </div>
  );
};

export default LandingPage;
