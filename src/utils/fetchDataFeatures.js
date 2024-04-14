const fetchDataFeatures = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData.data)
        return jsonData;
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  export default fetchDataFeatures;