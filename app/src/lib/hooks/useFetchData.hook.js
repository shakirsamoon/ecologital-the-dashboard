import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchData = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      axios
        .get(url, config)
        .then((res) => res.data)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    })();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
