import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(url);
      setData(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  const reFetch = () => {
    fetchData();
  };

  return { data, loading, error, setData, reFetch };
};

export default useFetch;
