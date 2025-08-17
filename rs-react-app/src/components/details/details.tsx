'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/loading-progress/loading';
import { useGetItemDetailsQuery } from '@/store/api-slice';

const Details = () => {
  const { name } = useParams();

  if (!name || Array.isArray(name)) throw new Error('Cannot take a name');
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
      <Link href="/">
        <button className="close-button">✕</button>
      </Link>
    </>
  );
};

export default Details;
