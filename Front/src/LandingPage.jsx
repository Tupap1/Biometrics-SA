import React, { } from "react";
 
import {Link} from 'react-router-dom';
 
export default function LandingPage(){
 
  return (
    <div>
      
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">´
                  
                    <h1></h1>
                    
                    <center>
                    <p><Link to="/login" className="btn btn-success">Login</Link> | <Link to="/register" className="btn btn-success">register</Link> </p>
                    </center>
                </div>
            </div>
        </div>
        
    </div>
  );
}
