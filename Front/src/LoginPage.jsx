import "./components/styles/Login.css";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
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
        contrasena,
      });

      if (success) {
        const ruta = localStorage.getItem("redirectTo");
        navigate(ruta);
        if (ruta === null)
          navigate("/MenuInicio");
      } else {
        setError("Error durante el login. Por favor intente nuevamente.");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setError("Error durante el login. Por favor intente nuevamente.");
    }
  };

  return (
    <div className="root">
      <div className="HOLA">
        <div className="container-fluid h-custom">
          <div className="row ">
            <div className="col"></div>
            <div className="forms">
              <form onSubmit={handleLogin}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div>
                  <p id="leyenda">Iniciar Sesion</p>
                </div>
                <div className="formularios">
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Ingresa tu Email"
                    required
                  />

                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    id="contrasena"
                    className="form-control form-control-lg"
                    placeholder="Ingresa la contraseña"
                    required
                  />

                </div>
                </div>

                <div className="">
                  <button type="submit" className="loginbtn">
                    Login
                  </button>
                  <p className="registrate">
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
