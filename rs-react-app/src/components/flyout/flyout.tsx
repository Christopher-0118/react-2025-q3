import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { clearItems } from '../../store/item-slice';
import type { Item } from '../../store/type';
import './flyout.css';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.item.items);
  const handleUnselect = () => dispatch(clearItems());
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const prepareContent = (items: Item[]): string => {
    const headers = ['id', 'name', 'description'];
    const rows = items.map((item) => [item.id, item.name, item.description]);
    return [headers, ...rows].map((row) => row.join(', ')).join('\n ');
  };

  const handleDownload = () => {
    const csv = prepareContent(selectedItem);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const filename = `${selectedItem.length}_items.csv`;
    const url = URL.createObjectURL(blob);
    const link = downloadLinkRef.current;

    if (link) {
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  if (selectedItem.length === 0) return null;

  return (
    <div className="flyout" data-testid="flyout">
      <p>Selected: {selectedItem.length}</p>
      <div className="flyout-buttons">
        <button
          className="unselect-button"
          data-testid="unselect-button"
          onClick={handleUnselect}
        >
          Unselect all
        </button>
        <button
          className="download-button"
          data-testid="download-button"
          onClick={handleDownload}
        >
          Download
        </button>
        <a
          ref={downloadLinkRef}
          style={{ display: 'none' }}
          data-testid="hidden-link"
        >
          secret
        </a>
      </div>
    </div>
  );
};

export default Flyout;
