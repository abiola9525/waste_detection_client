import { useState, useEffect } from 'react';
import { getBinHistory } from '../api';

export function useBinHistory(binId) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!binId) {
      setHistory([]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchHistory = async () => {
      try {
        const data = await getBinHistory(binId);
        if (isMounted) {
          // data is an array of readings ordered by -timestamp
          // reverse it for recharts so the chart goes left (old) to right (new)
          setHistory(data.reverse());
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch bin history');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [binId]);

  return { history, loading, error };
}
