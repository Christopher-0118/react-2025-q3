import { useAppSelector } from '../../hooks/useAppSelector';
import type { ResultsList } from '../api/type';
import Card from '../card/card';
import './card-list.css';

const CardList = ({ results }: ResultsList) => {
  const items = useAppSelector((store) => store.item.items); // я не уверена, что нам это вообще надо тут
  console.log(items);
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
