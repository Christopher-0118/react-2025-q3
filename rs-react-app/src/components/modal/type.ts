export type ModalProps = {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onChange: (extraInfo: string[]) => void;
};

export const EXTRA_KEY = ['methane', 'oil_co2', 'temperature_change_from_co2'];
