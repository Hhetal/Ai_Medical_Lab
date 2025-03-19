import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const useFetchReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/reviews`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setReviews(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
  };
};

export default useFetchReviews; 