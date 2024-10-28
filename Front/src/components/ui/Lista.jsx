import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Lista({ apiURL, value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL);
      setOptions(response.data);
    };

    fetchData();
  }, [apiURL]);


  return (
    <div className='lista-container'>
      <select value={value} onChange={onChange} className='form-select'>
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
