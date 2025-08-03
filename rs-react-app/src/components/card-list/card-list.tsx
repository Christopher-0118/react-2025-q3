import type { ResultsList } from '../api/type';
import Card from '../card/card';
import './card-list.css';

const CardList = ({ results }: ResultsList) => {
  return (
    <div className="card-list">
      <div className="item item-header">
        <strong>Item</strong>
        <strong>Description</strong>
      </div>
      {results.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          description={item.description}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default CardList;
