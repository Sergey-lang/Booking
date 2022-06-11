import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setDate(res.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setDate(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;


