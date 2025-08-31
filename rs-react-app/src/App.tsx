import '@/App.css';
import MainPage from '@/page/main-page';
import { Suspense } from 'react';

function App() {
  return (
    <div className="wrapper">
      <Suspense fallback={<div>Loading CO₂ data…</div>}>
        <MainPage />
      </Suspense>
    </div>
  );
}

export default App;
