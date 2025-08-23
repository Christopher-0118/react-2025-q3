import Modal from '@/components/modal/modal';
import { RhfForm } from '@/components/react-hook-form/rhf';
import UncontrolledForm from '@/components/uncontrolled-from/ucf';
import { useState } from 'react';
import '@/page/main-page.css';
import { RHF, UCF } from './constant';

export default function MainPage() {
  const [open, setOpen] = useState<null | typeof UCF | typeof RHF>(null);

  return (
    <div className="wrapper">
      <div className="buttons">
        <button onClick={() => setOpen(UCF)}>Uncontrolled Form</button>
        <button onClick={() => setOpen(RHF)}>React Hook Form</button>
      </div>

      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        ariaLabel="Form modal"
      >
        {open === UCF && <UncontrolledForm onSuccess={() => setOpen(null)} />}
        {open === RHF && <RhfForm onSuccess={() => setOpen(null)} />}
      </Modal>

      {/* List of Tiles */}
    </div>
  );
}
