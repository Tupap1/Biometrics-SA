import React, { useState } from "react";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Form(children) {
  return (
    <div className="mb-3">
    <input className="form-control" />
  </div>
  );
}

export default Form;
