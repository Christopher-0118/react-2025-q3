import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { name } = useParams();

  return (
    <div>
      <h2 className="pokemon-details">spicy details {name}</h2>
    </div>
  );
};

export default DetailsPage;
