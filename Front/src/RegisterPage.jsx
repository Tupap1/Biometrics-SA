import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./components/styles/register.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [nombres, setnombres] = useState("");
  const [nuip, setnuip] = useState("");
  const [apellidos, setapellidos] = useState("");
  const [rol, setrol] = useState("");
  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Aprendiz", label: "Aprendiz" },
    { value: "Instructor", label: "Instructor" },
  ];

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        email: email,
        contrasena: contrasena,
        nombres: nombres,
        nuip: nuip,
        apellidos: apellidos,
        rol: rol,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error, "error");
      if (error.response?.status === 401) {
        alert("Invalid credentials");
      }
    }
    alert("Usuario creado con éxito");

    setEmail("");
    setContrasena("");
    setnombres("");
    setnuip("");
    setapellidos("");
  };

  return (
    <div>
      <div className="container h-1000">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-1000">
            <div className="col-md-12 col-lg-12 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Registrar Usuario </p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Ingresa tu email"
                  />
                  <label className="form-label" for="form3Example3">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setcontrasena(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Ingresa contrasena"
                  />
                  <label className="form-label" for="form3Example4">
                    contrasena
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type=""
                    value={nombres}
                    onChange={(e) => setnombres(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Ingresa nombres del usuario"
                  />
                  <label className="form-label" for="form3Example4">
                    Nombres
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type=""
                    value={apellidos}
                    onChange={(e) => setapellidos(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Ingresa apellidos del usuario"
                  />
                  <label className="form-label" for="form3Example4">
                    apellidos
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type=""
                    value={nuip}
                    onChange={(e) => setnuip(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Ingresa NUIP del usuario"
                  />
                  <label className="form-label" for="form3Example4">
                    NUIP
                  </label>
                </div>


                <select
                  value={rol}
                  onChange={(e) => setrol(e.target.value)}
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.value} value={rol.value}>
                      {rol.label}
                    </option>
                  ))}
                </select>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={registerUser}
                  >
                    Sign Up
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Ingresar{" "}
                    <a href="/login" className="link-danger">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <div className="col-md-9 col-lg-6 col-xl-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
