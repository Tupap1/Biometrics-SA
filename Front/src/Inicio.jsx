import React from "react";
import './components/styles/layout.css';
import MenuLateral from "./components/ui/MenuLateral";

const Inicio = ({children}) => {
  return (
 
      <div>
        <div><MenuLateral/></div>
        <div className="content">{children}</div>
        
      </div>  
  );
}

export default Inicio;
