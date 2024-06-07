import "./styles.css";
import React, { useState, useEffect } from "react";

export function API() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("/API")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
}
