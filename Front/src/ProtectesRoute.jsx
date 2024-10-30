import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("Ruta actual:", location.pathname);
console.log("Estado de autenticación:", isAuthenticated);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;