import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../AuthContext';

const AuthButton = ({idboton}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      logout(navigate);  
    } else {
      navigate('/login');
    }
  };

  return (
    <button className="btn btn-primary" id={idboton} onClick={handleClick}>
      {isAuthenticated ? (
        <>
          <LogOut  className="mr-2" />
          Cerrar Sesión {user?.username && `(${user.username})`}
        </>
      ) : (
        <>
          <LogIn className="mr-2" />
          Iniciar Sesión
        </>
      )}
    </button>
  );
};

export default AuthButton;