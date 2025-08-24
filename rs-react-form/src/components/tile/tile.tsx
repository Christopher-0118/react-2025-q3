import type { Form } from '@/store/type';
import '@/components/tile/tile.css';

const Tile = ({ form }: { form: Form }) => {
  return (
    <div className="tile">
      {form.data.picture && (
        <img
          className="avatar"
          src={form.data.picture}
          alt={`${form.data.name}'s avatar`}
        />
      )}
      <div>
        <div>
          {form.data.name} · {form.data.age} · {form.data.gender} [{form.source}
          ]
        </div>
        <div>{form.data.email}</div>
        <div>{form.data.country}</div>
      </div>
    </div>
  );
};

export default Tile;
