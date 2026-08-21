import { useEffect, useState } from 'react';
import { fetchProperties } from '../data/mockData.js';

/**
 * Shared loading/error/data state for property listings.
 * Available for pages that need async listing fetch once a real API is wired.
 */
export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchProperties()
      .then((data) => {
        if (cancelled) return;
        setProperties(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { properties, isLoading, error };
}
