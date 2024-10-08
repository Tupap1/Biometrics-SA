import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

function Boton({ children, text, ...props }: Props) {
  return (
    <div>
      <button type="button" className="btn btn-primary">
        {text || children}
      </button>
    </div>
  );
}

export default Boton;