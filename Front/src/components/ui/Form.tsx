import React from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Form(props:Props) {
  return (
    <div>
      <input className="form-control col-6"  {...props}/>
      
    </div>
  );
}

export default Form;
