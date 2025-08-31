import { dataPromise } from '@/api/fetchData';
import type { DataMap } from '@/api/type';
import Modal from '@/components/modal/modal';
import TileList from '@/components/tile-list/tile-list';
import { use, useState } from 'react';
import './main-page.css';

const MainPage = () => {
  const Co2Data: DataMap = use(dataPromise);
  const [open, setOpen] = useState<boolean>(false);
  const [extraData, setExtraData] = useState<string[]>([]);

  return (
    <>
      <header className="header">
        <h3>CO₂ by Country</h3>
        <button className="widget-button__open" onClick={() => setOpen(true)}>
          Choose columns…
        </button>
      </header>
      <main className="main">
        <TileList data={Co2Data} extra={extraData} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          selected={extraData}
          onChange={setExtraData}
        />
      </main>
    </>
  );
};

export default MainPage;
