import "./styles.css";

export function Login() {
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
