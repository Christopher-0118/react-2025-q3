import { useNavigate } from 'react-router-dom';
import type { Result } from '../../type';
import './card.css';

const Card = ({ name, description }: Result) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/pokemon/${name}/details`);
  };

  return (
    <div className={'item'} onClick={handleClick} data-testid="card">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default Card;
