import { useState, useEffect } from 'react';
import { getBinsStatus } from '../api';

export function useBinsStatus(pollingIntervalMs = 30000) {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const data = await getBinsStatus();
        if (isMounted) {
          setBins(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch bin status');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, pollingIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [pollingIntervalMs]);

  return { bins, loading, error };
}
