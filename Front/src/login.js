import "./styles.css";
import React, { useState, useEffect } from 'react'

export function Login() {


  const [data, setData] = useState ([{}])
  useEffect(() => {
    fetch ("/API").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


  return (
   <div style={{backgroundImage: 'url("biometrics/public/backGround.png")'}}>
      <div className="login">
        <form action="POST">
          <h1 className="titulo" id="loginHead">
            Inciar sesion
          </h1>

          <input id="usuario" className="formInput" type="text" placeholder="User" />
          <input
            id="password"
            className="formInput"
            type="password"
            placeholder="Password"
          />
          <button id="entrarLogin"
            className="Btnenviar" >
            Enviar
          </button>
        </form>
      </div>
    </div>

  );
}
