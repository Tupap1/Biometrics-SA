import React, { useState, useEffect } from "react";
import axios from "axios";
import Boton from "./Boton";
import '../styles/Card.css';

function Card({ apiURL, text, textboton, title, info, text2, info2, link, textboton2, link2, accion, error, texto2 }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setDatos(response.data);
        console.log("cardd")
        console.log(datos)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [apiURL]); 

  const renderDatos = () => {
    if (datos.length === 0) {
      return <p>{error}</p>;
    }

    return (
      <div>

        {datos.map((dato) => (
          <div key={dato.id} className="card">
            <img className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{dato[title]}</h5>
              <p className="card-text">
                {text} {dato[info]} {text2} {dato[info2]}{texto2}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderDatos()}
    </div>
  );
}

export default Card;