import { useEffect, useState } from 'react';
import axios from 'axios';

export const UseAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          method,
          url
        });
        setData(response.data);
      } catch (error) {
        // if (getItem() !== undefined) {
        //   setData(getItem());
        // } else {
        setError(error.message);
        // }
      } finally {
        setLoaded(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loaded };
};
