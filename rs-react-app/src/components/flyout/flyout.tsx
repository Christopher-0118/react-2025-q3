import { useAppSelector } from '../../hooks/useAppSelector';
import './flyout.css';

const Flyout = () => {
  const selectedItem = useAppSelector((state) => state.item.items);

  if (selectedItem.length === 0) return null;

  return (
    <div className="flyout" data-testid="flyout">
      <p>Selected: {selectedItem.length}</p>
      <div className="flyout-buttons">
        <button className="unselect-button" data-testid="button">
          Unselect all
        </button>
        <button className="download-button" data-testid="button">
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
