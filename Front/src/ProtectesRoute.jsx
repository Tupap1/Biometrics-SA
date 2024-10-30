import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("Ruta actual:", location.pathname);
     console.log("Estado de autenticación:", isAuthenticated);

  if (!isAuthenticated || !token) {
    localStorage.setItem('redirectTo', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;