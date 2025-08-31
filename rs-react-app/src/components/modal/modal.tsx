import { createPortal } from 'react-dom';
import { EXTRA_KEY, type ModalProps } from './type';
import { useEffect, useRef } from 'react';
import '@/components/modal/modal.css';

const Modal = ({ open, onClose, selected, onChange }: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, open]);

  if (!open || !modalRoot) return null;

  const toggle = (k: string) => {
    if (selected.includes(k)) onChange(selected.filter((x) => x !== k));
    else onChange([...selected, k]);
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} aria-hidden="true">
      <div
        ref={dialogRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Select additional columns"
      >
        <div className="modal-header">
          <h3>Select additional columns</h3>
          <button onClick={onClose}>×</button>
        </div>

        <p className="small">
          Core columns: year, population, co2, co2_per_capita
        </p>

        <div className="modal-grid">
          {EXTRA_KEY.map((k) => (
            <label key={k}>
              <input
                type="checkbox"
                checked={selected.includes(k)}
                onChange={() => toggle(k)}
              />
              {k}
            </label>
          ))}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
