import React, { useState, useEffect } from 'react';
import UILisFeatures from './UIListFeatures';
import UISelect from './UISelect';
import fetchDataFeatures from '../utils/fetchDataFeatures';
import Pagination from '@mui/material/Pagination';

function ListFeatures() {
  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://192.168.5.181:3000//api/features?");
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState(new URLSearchParams(window.location.search));
  console.log("params aqui", params.toString())
//   const apiUrl = 'http://192.168.5.181:3000//api/features?page=1&per_page=2&mag_type%5B%5D=ml'; // Reemplaza con tu URL de API

    // const params = 
    // params.set('nombreDelParametro', 'valorDelParametro');
    // window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

  useEffect(() => {
    console.log("CAMBIO", params)
    // Función para obtener los datos
    const fetchData = async () => {
      try {
        const formatParams = params.toString().replaceAll("mag_type","mag_type[]");
        const finalURL = `${apiUrl}${formatParams}`;
        console.log("final", finalURL);
        const response = await fetchDataFeatures(finalURL);
        const { data, pagination } = response;
        setData(data);
        setPage(pagination.total);
        setPerPage(pagination.per_page);
        setCurrentPage(pagination.current_page)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función al montar el componente
  }, [params]); // El segundo argumento vacío asegura que se ejecute solo una vez al montar

  const handlehangePagination=(event, page)=> {

    console.log("PAGINA ACTUAL", page)

    const newParams = new URLSearchParams(params);
    newParams.set('page', page);
    setCurrentPage(page);
    setParams(newParams);
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);

    // const apiUrlBase =  `http://192.168.5.181:3000//api/features?page=${page}&per_page=${perPage}`
    // setApiUrl(apiUrlBase)
  }
  return (
    <div>

      {data ? (<>
        <Pagination count={page} page={currentPage} onChange={handlehangePagination}/>
        <UISelect setParams={setParams} params={params}/>
     <UILisFeatures data={data}/>
     </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default ListFeatures;
