import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Result } from '../components/api/type';
import fetchData from '../components/api/fetch';
import Loading from '../components/loading-progress.tsx/loading';
import { DETAILS } from '../components/api/constant';

const DetailsPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [result, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!name) return;

    fetchData({
      term: name,
      setResults,
      setError,
      setLoading,
      page: 1,
      limit: 1,
      mode: DETAILS,
    });
  }, [name]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!result.length) return null;

  return (
    <>
      <div className="details" data-testid="details">
        <h2 className="pokemon-details">{name}</h2>
        <p className="pokemon-details">{result[0].description}</p>
      </div>
      <button
        className="close-button"
        data-testid="button"
        onClick={handleClick}
      >
        ✕
      </button>
    </>
  );
};

export default DetailsPage;
