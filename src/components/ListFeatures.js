import React, { useState, useEffect } from 'react';
import UILisFeatures from './UIListFeatures';

function ListFeatures() {
  const [data, setData] = useState(null);
  const apiUrl = 'http://192.168.5.181:3000/api/features?per_page=100'; // Reemplaza con tu URL de API

  useEffect(() => {
    // Función para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData.data)
          setData(jsonData.data);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función al montar el componente
  }, []); // El segundo argumento vacío asegura que se ejecute solo una vez al montar

  return (
    <div>

      {data ? (
     <UILisFeatures data={data}/>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default ListFeatures;
