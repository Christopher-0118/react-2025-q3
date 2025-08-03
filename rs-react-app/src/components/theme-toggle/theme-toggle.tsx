import { DARK, LIGHT } from './constant';
import useAppContext from '../../hooks/useAppContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="toggle-theme">
      <button onClick={toggleTheme}>{theme === 'light' ? DARK : LIGHT}</button>
    </div>
  );
};

export default ThemeToggle;
