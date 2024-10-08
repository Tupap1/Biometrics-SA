import React from "react";
import { useNavigate } from "react-router-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string; // New property for specifying the redirection path
}

function Boton({ children, text, to, ...props }: Props) {
  const navigate = useNavigate(); // Hook to access the navigation function

  const handleClick = () => {
    if (to) {
      navigate(to); // Redirect to the specified path if it exists
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        {text || children}
      </button>
    </div>
  );
}

export default Boton;