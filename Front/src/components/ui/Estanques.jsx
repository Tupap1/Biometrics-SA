import React, { useState, useEffect } from 'react';

const Estanques = ({ 
  apiURL, 
  value, 
  onChange, 
  onInit,
  placeholder = "Seleccione una opción",
  autoSelectSingle = true, 
  labelKey = 'id_estanque', 
  valueKey = 'id_estanque', 
  formatLabel = (item) => `Estanque "${item.label}" - ${item.numeropeces} peces` 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(apiURL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOptions(data);
      

      if (data.length > 0 && (onInit || (data.length === 1 && autoSelectSingle))) {
        const firstValue = data[0][valueKey];
        onInit?.(firstValue);
        if (!onInit && autoSelectSingle && onChange) {
          onChange({ target: { value: firstValue } });
        }
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiURL]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <select
        value={value || ''}
        onChange={onChange}
        className='form-select'
        disabled={loading}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option 
            key={option[valueKey]} 
            value={option[valueKey]}
          >
            {formatLabel(option)}
          </option>
        ))}
      </select>
      {options.length === 0 && !loading && (
        <div className="text-sm text-gray-500 mt-1">
          No hay opciones disponibles
        </div>
      )}
    </div>
  );
};

export default Estanques;