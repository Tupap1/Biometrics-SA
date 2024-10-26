import React from "react";


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  onClickCustom?: () => void;
}


function SideBar() {



  return (
    <div>
      <link
        rel="canonical"
        href="https://getbootstrap.com/docs/5.3/examples/sidebars/"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
      />
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="sidebars.css" rel="stylesheet" />

      <div
        className=" d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: 280 + "px", height: 1024 + "px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg
            className="bi   
 pe-none me-2"
            width="40"
            height="32"
          ></svg>
          <span className="fs-4">Biometrics SA</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            {" "}
             
            <a href="/" className="nav-link  text-white " aria-current="page">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Inicio
            </a>
          </li>
          <li>
            <a href="/MenuBiometria" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Biometrias
            </a>
          </li>
          <li>
            <a href="/MenuEstanques" className="nav-link text-white">
              <svg
                className="bi   
 pe-none me-2"
                width="16"
                height="16"
              ></svg>
              Estanques
            </a>
          </li>
          <li>
            <a href="/MenuWQ" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              WQ's
            </a>
          </li>
          <li>
            <a href="/MenuPeces" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Peces
            </a>
          </li>
          <li>
            <a href="/MenuAlimentos" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Alimentos
            </a>
          </li>
          <li>
            <a href="/Informes" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"></svg>
              Informes
            </a>
          </li>
          <li></li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white   
 text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>User</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            {" "}
             
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>{" "}
         
      </div>
    </div>
  );
}

export default SideBar;
