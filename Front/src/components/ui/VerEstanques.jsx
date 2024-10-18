import React, { useState, useEffect } from "react";
import axios from "axios";
import Boton from "./Boton"; 
import '../styles/Card.css';

function Card() {
  const [estanques, setEstanques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/consultarestanque");
        setEstanques(response.data);
      } catch (error) {
        console.error("Error:", error);

      }
    };

    fetchData();
  }, []);

  const renderEstanques = () => {
    if (estanques.length === 0) {
      return <p>cargando estanques...</p>;
    }

    return estanques.map((estanque) => (
      <div key={estanque.id_estanque} className="card">
        <img className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{estanque.nombreEstanque}</h5>
          <p className="card-text">
            Pez: {estanque.nombre_pez} 
          </p>
          <Boton text="Ver estanque" to="/Estanque"/>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderEstanques()}
    </div>
  );
}

export default Card;