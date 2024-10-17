import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Lista(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(props);
      setOptions(response.data);
    };

    fetchData();
  }, []);

  return (
    <select>
      {options.map(option => (
        <option key={option.id} value={option.id}>  
          {option.label}  
        </option>
      ))}
    </select>
  );
}

export default Lista;