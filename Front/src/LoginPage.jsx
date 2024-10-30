
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const success = await login({ 
        email, 
        contrasena 
      });

      if (success) {
        const ruta = localStorage.getItem('redirectTo')
        navigate(ruta)
      } else {
        setError("Error durante el login. Por favor intente nuevamente.");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setError("Error durante el login. Por favor intente nuevamente.");
    }
  };

  return (
    <div>
      <div className="container h-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5"></div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleLogin}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Ingresa a Biometrics SA</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Ingresa tu Email"
                    required
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email 
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Ingresa la contraseña"
                    required
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Contraseña
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    No tienes una cuenta en Biometrics?{" "}
                    <a href="/register" className="link-danger">
                      Registrate
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}