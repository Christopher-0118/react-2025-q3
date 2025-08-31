import Tile from '../tile';
import type { TileListProps } from './type';

const TileList = ({ data, extra }: TileListProps) => {
  const countries = Object.values(data);
  return (
    <div className="tile-list">
      {countries.map((element) => (
        <Tile key={element.name} country={element} extra={extra} />
      ))}
    </div>
  );
};

export default TileList;
