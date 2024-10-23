import React from "react";
import { useNavigate } from "react-router-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  className?:string;
  id?: string;
  onClickCustom?: () => void;
}

function Boton({ children,className, text, to, onClickCustom,id, ...props }: Props) {
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
      <button type="button" className={className} id={id} onClick={handleClick}>
        {text || children}
      </button>
    </div>
  );
}

export default Boton;