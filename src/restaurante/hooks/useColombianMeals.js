import { useState, useEffect, useCallback } from 'react';
import { getMenuByCountry } from '../api/restaurantApi';
import { DEFAULT_COUNTRY, UI } from '../constants/app';

export const useColombianMeals = (country = DEFAULT_COUNTRY) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getMenuByCountry(country);
      setMeals(data);
    } catch (err) {
      setError(err.message || UI.loadingMessage);
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    meals,
    loading,
    error,
    reload,
  };
};
