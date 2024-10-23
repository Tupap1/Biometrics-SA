
import { Link } from 'react-router-dom';
import LoginButton from './components/ui/LoginButton';
import LogoutButton from './components/ui/LogoutButton'
import './components/styles/LandingPage.css'; 
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();





  return (
    <div className="landing-container">
      <header className="header">
      <LogoutButton></LogoutButton>    
      <LoginButton></LoginButton>    
        
      </header>
      <div className="logo-container">
        <img src="logo.png" alt="Biometrics SA" className="logo.png" />
      </div>

      <div className="button-container">
        <Link to="/Biometria" className="primary-button">Registrar Biometría</Link>
        <button className="primary-button">Registro WQ</button>
      </div>
    </div>
  );
};

export default LandingPage;
