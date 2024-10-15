import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Nombre() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,   
 setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const   
 response = await axios.get('/user'); 
        if (response.data) {
          setIsLoggedIn(true);
          setUserName(response.data.nombre); 
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, contrasena: password });
      if (response.data) {
        setIsLoggedIn(true);
        setUserName(response.data.nombres); 
      }
    } catch (error) {
      console.error('Login error:', error);
      
    }
  };

  

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome, {userName}!</h1>

        </>
      ) : (
        <LoginForm onSubmit={handleLogin} />  
      )}
    </div>
  );
}

export default Nombre;