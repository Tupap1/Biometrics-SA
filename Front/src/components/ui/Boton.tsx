import React from "react";
import { useNavigate } from "react-router-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  onClickCustom?: () => void;
}

function Boton({ children, text, to, onClickCustom, ...props }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    if (onClickCustom) {
      onClickCustom();
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