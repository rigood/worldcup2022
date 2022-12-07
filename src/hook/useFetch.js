import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`${response.status} Error`);
        }

        const results = await response.json();
        setData(results);
      } catch (err) {
        setError(err.message || "Server Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, isLoading, options]);

  return [{ data, isLoading, error }, doFetch];
}

export default useFetch;
