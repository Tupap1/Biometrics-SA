
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
 
export default function LoginPage(){

  const navigate = useNavigate();

  const [email,setemail] = useState('');
  const [contrasena,setcontrasena] = useState('');


   const handleLogin = async (event) => {
     event.preventDefault(); 
 
    
     try {
       const response = await axios.post('http://127.0.0.1:5000/login', {
         email,
         contrasena,
       });
 
       console.log('Login successful:', response.data);
       navigate('/'); 
     } catch (error) {
       console.error('Login error:', error);
       if (error.response && error.response.status === 401) {
         alert('Invalid credentials.');
       } else {
         alert('An error occurred during login. Please try again.'); 
       }
     }
   };



  return (
    <div>
        <div className="container h-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">

              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="contrasena" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter contrasena" />
                    <label className="form-label" for="form3Example4">contrasena</label>
                  </div>
 
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">

  
                    </div>
                    <a href="#!" className="text-body">Forgot contrasena?</a>
                  </div>
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                  </div>
 
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}