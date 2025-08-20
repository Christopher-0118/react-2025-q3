import { useTranslations } from 'next-intl';
import type { ResultsList } from '../../store/type';
import Card from '../card/card';
import './card-list.css';

const CardList = ({ results }: ResultsList) => {
  const mainUi = useTranslations('Main');
  return (
    <div className="card-list">
      <div className="item item-header">
        <strong>{mainUi('tableItem')}</strong>
        <strong>{mainUi('tableDescription')}</strong>
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
