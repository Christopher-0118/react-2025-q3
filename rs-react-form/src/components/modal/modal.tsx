import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './type';
import '@/components/modal/modal.css';

const getModalRoot = () => {
  const el = document.getElementById('modal-root');
  if (!el) throw new Error('#modal-root not found. Add it to index.html');
  return el;
};

const Modal = ({
  open,
  onClose,
  ariaLabel = 'Modal',
  children,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          first.focus();
        } else if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>(
          '[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        ?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="modal-dialog"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    getModalRoot()
  );
};

export default Modal;
