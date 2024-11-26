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

function MenuLateral() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [userdata, setUserdata] = useState({});

  const datosUser = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/users/${iduser}`)
    console.log(response.data)
    setUserdata(response.data)    
  }


  useEffect(() => {
    datosUser();  
  }, []);

  const menuItems = [
    { path: "/MenuInicio", icon: <IoHomeOutline />, text: "Inicio" },
    { path: "/MenuBiometria", icon: <TbRulerMeasure />, text: "Biometrias" },
    { path: "/MenuEstanques", icon: <SiSpond />, text: "Estanques" },
    { path: "/MenuWQ", icon: <FaTachometerAlt />, text: "WQ" },
    { path: "/MenuPeces", icon: <FaFish />, text: "Peces" },
    { path: "/MenuAlimentos", icon: <GiOpenedFoodCan />, text: "Alimentos "+" y " +" Alimentaciones" }
  ];

  return (
    <div className="flex">
      <div 
        className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {console.log()}
        <div className="navigation">
          <ul>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className={`list ${location.pathname === item.path ? 'active' : ''}`}
              >
                <a href={item.path}>
                  <span className="icon">
                    {item.icon}
                  </span>
                  <span className="text">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="usercontent">
            <hr />

            {!isExpanded && (
              <div className="user-info">
                <img className="user-icon" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" />
              </div>
            )}
            {isExpanded && (
              <div className="user-info">
                <AuthButton idboton="btnlogin"></AuthButton>
              </div>
            )}
          
          <h1>{console.log(userdata)}</h1>
        </div>
      </div>
    </div>
  );
}

export default MenuLateral;