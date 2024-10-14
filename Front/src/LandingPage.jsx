
import { Link } from 'react-router-dom';
import './components/styles/LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <button className="login-button">Entrar</button>
      </header>
      <div className="logo-container">
        <img src="logo.png" alt="Biometrics SA" className="logo.png" />
      </div>

      <div className="button-container">
        <Link to="/login" className="primary-button">Registrar Biometría</Link>
        <button className="primary-button">Registro WQ</button>
      </div>
    </div>
  );
};

export default LandingPage;
