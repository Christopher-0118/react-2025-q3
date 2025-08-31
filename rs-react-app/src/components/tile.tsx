import type { Country } from '@/api/type';
import Table from './table';

const Tile = ({ country, extra }: { country: Country; extra: string[] }) => {
  const { name, iso_code, data } = country;
  const lastYear = data.at(-1);
  const lastPopulation = lastYear?.population ?? 'N/A';

  return (
    <div className="tile">
      <h4>{`${name ?? 'N/A'}, ${iso_code ?? 'N/A'}, ${lastPopulation}`}</h4>
      <Table dataPerYear={data} extraFields={extra} />
    </div>
  );
};

export default Tile;
