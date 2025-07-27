import type { Result } from '../../type';
import './card.css';

const Card = ({ name, description }: Result) => {
  return (
    <div className={'item'} data-testid="card">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default Card;
