import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./Inicio.tsx";
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Biometria from "./Biometrias/Biometria.jsx";
import MenuInicio from "./Menus/MenuInicio.jsx";
import MenuBiometrias from "./Menus/MenuBiometrias.jsx";
import VerBiometria from "./Biometrias/VerBiometria.jsx";
import MenuWQ from "./Menus/MenuWQ.jsx";
import WQ from "./WQ/WQ.jsx";
import VerWQ from "./WQ/VerWQ.jsx";
import MenuEstanques from "./Menus/MenuEstanques.jsx";
import RegistrarEstanque from "./Estanques/RegistrarEstanque.jsx";
import VerEstanques from "./Estanques/VerEstanques.jsx";
import CrearPeces from "./Peces/CrearPeces.jsx";
import Estanque from "./Estanques/Estanque.jsx";
import VerBiometrias2 from "./Biometrias/VerBiometriasCard.jsx";
import RegistrarBiometria from "./Biometrias/RegistrarBiometria.jsx";
import MenuInformes from "./Menus/MenuInformes.jsx";
import RegistrarAlimentacion from "./Alimentacion/RegistrarAlimentacion.jsx";
import InformesAlimentacion from "../Informes/InformesAlimentacion.jsx";
import InformesEstanque from "../Informes/InformesEstanque.jsx";
import InformesBiometrias from "../Informes/InformesBiometrias.jsx";
import CrearAlimento from "../alimentos/CrearAlimento.jsx";
import VerAlimentos from "../alimentos/VerAlimentos.jsx";
import MenuAlimentos from "./Menus/MenuAlimentos.jsx";
import VerAlimentacion from "./Alimentacion/VerAlimentacion.jsx";
import MenuPeces from "./Menus/MenuPeces.jsx";
import VerPeces from "./Peces/VerPeces.jsx";
import DetallesEstanque from "./Estanques/DetallesEstanque.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./ProtectesRoute.jsx";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import Calculadora from "./Calculadora.jsx";


const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); 
  
  
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div className="row">
      {isAuthenticated && !isPublicRoute && (
        <div className="col">
          <Inicio />
        </div>
      )}
      <div className={isAuthenticated && !isPublicRoute ? "col-9" : "col-12"}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/MenuInicio"
              element={
                <ProtectedRoute>
                  <MenuInicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RegistrarAlimentacion"
              element={
                <ProtectedRoute>
                  <RegistrarAlimentacion />
                </ProtectedRoute>
              }
            />

<Route
              path="/Calculadora"
              element={
                <ProtectedRoute>
                  <Calculadora />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Biometria"
              element={
                <ProtectedRoute>
                  <RegistrarBiometria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MenuBiometria"
              element={
                <ProtectedRoute>
                  <MenuBiometrias />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerBiometria"
              element={
                <ProtectedRoute>
                  <VerBiometria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MenuWQ"
              element={
                <ProtectedRoute>
                  <MenuWQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/WQ"
              element={
                <ProtectedRoute>
                  <WQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerWQ"
              element={
                <ProtectedRoute>
                  <VerWQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MenuEstanques"
              element={
                <ProtectedRoute>
                  <MenuEstanques />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RegistrarEstanques"
              element={
                <ProtectedRoute>
                  <RegistrarEstanque />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerEstanques"
              element={
                <ProtectedRoute>
                  <VerEstanques />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CrearPeces"
              element={
                <ProtectedRoute>
                  <CrearPeces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MenuPeces"
              element={
                <ProtectedRoute>
                  <MenuPeces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Estanque"
              element={
                <ProtectedRoute>
                  <Estanque />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editarestanque/:id"
              element={
                <ProtectedRoute>
                  <DetallesEstanque estanqueId={5} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/biometria/:id"
              element={
                <ProtectedRoute>
                  <Biometria />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Informes"
              element={
                <ProtectedRoute>
                  <MenuInformes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RegistrarAlimentacion"
              element={
                <ProtectedRoute>
                  <RegistrarAlimentacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/InformesAlimentacion"
              element={
                <ProtectedRoute>
                  <InformesAlimentacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/InformesBiometrias"
              element={
                <ProtectedRoute>
                  <InformesBiometrias />
                </ProtectedRoute>
              }
            />
            <Route
              path="/InformesEstanque"
              element={
                <ProtectedRoute>
                  <InformesEstanque />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CrearAlimento"
              element={
                <ProtectedRoute>
                  <CrearAlimento />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerAlimento"
              element={
                <ProtectedRoute>
                  <VerAlimentos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerAlimentacion"
              element={
                <ProtectedRoute>
                  <VerAlimentacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MenuAlimentos"
              element={
                <ProtectedRoute>
                  <MenuAlimentos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerPeces"
              element={
                <ProtectedRoute>
                  <VerPeces />
                </ProtectedRoute>
              }
            />


            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Navigate to="/MenuInicio" replace />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

const AuthProviderWithRouter = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

export default App;