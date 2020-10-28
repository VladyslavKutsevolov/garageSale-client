import { useCallback, useState } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');


  const request = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    try {
      const data = await axios(url, { method, data: body });
      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(
    () => setTimeout(() => setError(null), 3000),
    []
  );
  const clearMessage = useCallback(
    () => setTimeout(() => setMessage(null), 3000),
    []
  );

  return {
    request,
    loading,
    error,
    message,
    clearError,
    clearMessage,
    setMessage
  };
};

export default useHttp;
