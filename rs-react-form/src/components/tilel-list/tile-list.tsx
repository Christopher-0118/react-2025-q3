import Tile from '@/components/tile/tile';
import { useAppSelector } from '@/hooks/useFormSelector';
import '@/components/tilel-list/tile-list.css';

const TileList = () => {
  const forms = useAppSelector((state) => state.form.forms);

  if (forms.length === 0) return <p>No submissions yet.</p>;

  return (
    <div className="tile-list">
      {forms.map((form) => (
        <Tile key={form.id} form={form} />
      ))}
    </div>
  );
};

export default TileList;
