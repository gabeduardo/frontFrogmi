import React, { useState, useEffect } from 'react';
import UILisFeatures from './UIListFeatures';
import UISelect from './UISelect';
import fetchDataFeatures from '../utils/fetchDataFeatures';

function ListFeatures() {
  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://192.168.5.181:3000//api/features?");
//   const apiUrl = 'http://192.168.5.181:3000//api/features?page=1&per_page=2&mag_type%5B%5D=ml'; // Reemplaza con tu URL de API

  useEffect(() => {
    // Función para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetchDataFeatures(apiUrl);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función al montar el componente
  }, [apiUrl]); // El segundo argumento vacío asegura que se ejecute solo una vez al montar

  return (
    <div>

      {data ? (<>
        <UISelect setApiUrl={setApiUrl}/>
     <UILisFeatures data={data}/>
     </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default ListFeatures;
