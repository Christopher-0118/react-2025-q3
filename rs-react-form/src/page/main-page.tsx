import Modal from '@/components/modal/modal';
import { RhfForm } from '@/components/react-hook-form/rhf';
import UncontrolledForm from '@/components/uncontrolled-from/ucf';
import { useState } from 'react';
import '@/page/main-page.css';
import { RHF, UCF } from './constant';
import { useAppDispatch } from '@/hooks/useFormDispatch';
import type { FormData } from '@/store/type';
import { addForm } from '@/store/form-slice';
import TileList from '@/components/tilel-list/tile-list';

export default function MainPage() {
  const [open, setOpen] = useState<null | typeof UCF | typeof RHF>(null);

  // const dispatch = useAppDispatch();

  // const addTestSubmission = () => {
  //   const dummy: FormData = {
  //     name: 'Test User',
  //     age: 30,
  //     email: 'test@example.com',
  //     password: 'Qwerty1!',
  //     gender: 'Male',
  //     term: true,
  //     country: 'Poland',
  //     picture: 'undefined',
  //   };
  //   dispatch(
  //     addForm({
  //       source: 'UCF',
  //       data: dummy,
  //     })
  //   );
  // };

  return (
    <div className="wrapper">
      <div className="buttons">
        {/* <button onClick={addTestSubmission}>Добавить тестовую запись</button> */}
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

      <TileList />
    </div>
  );
}
