import React, { } from "react";
 
import {Link} from 'react-router-dom';
 
export default function LandingPage(){
 
  return (
    <div>
        <div className="container h-1000">
            <div className="row h-1000">
                <div className="col-16">
                    <h1></h1>
                    <p><Link to="/login" className="btn btn-success">Login</Link> | <Link to="/register" className="btn btn-success">Registro</Link> </p>
                </div>
            </div>
        </div>
    </div>
  );
}