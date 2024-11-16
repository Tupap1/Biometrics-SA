import React, { useState, useEffect } from 'react';

const Lista = ({ apiURL, value, onChange, onInit }) => {
  const [options, setOptions] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setOptions(data);
      

      if (data.length > 0 && onInit) {
        onInit(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [apiURL]);

  return (
    <div className="w-full">
      <select 
        value={value} 
        onChange={onChange}
        className="w-full p-2 border rounded-md bg-white shadow-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Lista;