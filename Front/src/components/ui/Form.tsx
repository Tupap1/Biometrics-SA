import React from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Form(children) {
  return (
    <div>
      <input className="form-control"  />
    </div>
  );
}

export default Form;
