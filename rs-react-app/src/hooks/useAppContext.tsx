import { useContext } from 'react';
import ThemeContext from '../context/theme-context';

const useAppContext = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useAppContext;
