'use client';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/loading-progress.tsx/loading';
import { useGetItemDetailsQuery } from '../store/api-slice';

const DetailsPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const handleClick = () => {
    navigate('/');
  };
  if (!name) throw new Error('Cannot take a name');
  const { data, error, isLoading } = useGetItemDetailsQuery({ name });

  if (isLoading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>Failed to fetch details</p>;
  if (!data) return null;

  return (
    <>
      <div className="details" data-testid="details">
        <h2 className="pokemon-details" data-testid="details-name">
          {name}
        </h2>
        <p className="pokemon-details" data-testid="details-ability">
          {data.description}
        </p>
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
