import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/MenuLateral.css";
import { IoHomeOutline } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { SiSpond } from "react-icons/si";
import { FaTachometerAlt } from "react-icons/fa";
import { FaFish } from "react-icons/fa";
import { GiOpenedFoodCan } from "react-icons/gi";
import { useEffect } from "react";
import AuthButton from "./Loginboton";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useAuth } from "../../AuthContext";

function MenuLateral() {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [nombres, setNombres] = useState({
    nombre: "",
    apellido: "",
  });

  const datosUser = async () => {
    const iduser = localStorage.getItem("iduser");
    const response = await axios.get(`http://127.0.0.1:5000/users/${iduser}`);
    console.log("consultando datos");
    setUserdata(response.data);
    console.log(userdata);
  };

  useEffect(() => {
    datosUser();
  }, []);

  const menuItems = [
    { path: "/MenuInicio", icon: <IoHomeOutline />, text: "Inicio" },
    { path: "/MenuBiometria", icon: <TbRulerMeasure />, text: "Biometrias" },
    { path: "/MenuEstanques", icon: <SiSpond />, text: "Estanques" },
    { path: "/MenuWQ", icon: <FaTachometerAlt />, text: "WQ" },
    { path: "/MenuPeces", icon: <FaFish />, text: "Peces" },
    {
      path: "/MenuAlimentos",
      icon: <GiOpenedFoodCan />,
      text: "Alimentos " + " y " + " Alimentaciones",
    },
  ];

  return (
    <div className="flex">
      <div
        className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {console.log()}
        <div className="navigation">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`list ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <a href={item.path}>
                  <span className="icon">{item.icon}</span>
                  <span className="text">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="usercontent">
          <hr />

          {!isExpanded && (
            <div className="user-info">
              <div className="circle">
                <div className="user-name">
                  {nombres.nombre[0]}
                  {/* {nombres.apellido[0]}   * */}
                </div>
              </div>
            </div>
          )}

          {isExpanded && (
            <div className="user-info">
              <div>
                {nombres.nombre} {nombres.apellido}
              </div>
              <Dropdown
                className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                direction="up"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle className="" id="dropdown"></DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={logout}>Cerrar Sesión</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <AuthButton idboton="btnlogin"></AuthButton> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuLateral;
