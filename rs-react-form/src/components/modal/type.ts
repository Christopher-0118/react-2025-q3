import React from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
};
