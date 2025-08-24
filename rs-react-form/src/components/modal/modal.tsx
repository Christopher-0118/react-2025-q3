import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './type';
import '@/components/modal/modal.css';
import { FOCUS_ELEMENTS, KEY_DOWN, KEY_ESC, KEY_TAB } from './constant';

const getModalRoot = () => {
  const el = document.getElementById('modal-root');
  if (!el) throw new Error('#modal-root not found');
  return el;
};

const Modal = ({
  open,
  onClose,
  ariaLabel = 'Modal',
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    if (document.activeElement instanceof HTMLElement) {
      lastFocusedRef.current = document.activeElement;
    } else {
      lastFocusedRef.current = null;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEY_ESC) {
        e.preventDefault();
        onClose();
      } else if (e.key === KEY_TAB) {
        const focusable =
          modalRef.current?.querySelectorAll<HTMLElement>(FOCUS_ELEMENTS);

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

    document.addEventListener(KEY_DOWN, onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector<HTMLElement>(FOCUS_ELEMENTS)?.focus();

    return () => {
      document.removeEventListener(KEY_DOWN, onKeyDown);
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
        ref={modalRef}
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
