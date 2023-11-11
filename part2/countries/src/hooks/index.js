import { useEffect, useState } from 'react';
import axios from 'axios';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      const apiUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;
      axios.get(apiUrl)
        .then(response => {
          const data = response.data[0];
          setCountry(data);
        })
        .catch(error => {
          console.error('Failed to fetch country data:', error);
          setCountry(null);
        });
    }
  }, [name]);

  return country;
};

export default useCountry;
