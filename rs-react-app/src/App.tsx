import { Route, Routes } from 'react-router-dom';
import MasterPage from './pages/master-page';
import DetailsPage from './pages/detail-page';
import ErrorPage from './pages/error-page';
import About from './pages/about-page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterPage />}>
        <Route path="pokemon/:name/details" element={<DetailsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
