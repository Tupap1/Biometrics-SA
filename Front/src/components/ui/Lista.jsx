import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Lista({apiURL, value, onChange} ) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL);
      setOptions(response.data);
    };

    fetchData();
  }, []);


  return (
    <div>
    <select className='form-select' onChange={onChange} >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
        
      ))}
    </select>
    </div>
  );
}

export default Lista;