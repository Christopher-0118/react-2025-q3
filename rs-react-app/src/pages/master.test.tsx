/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MasterPage from './master-page';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

vi.mock('../components/api/fetch', () => ({
  default: vi.fn(),
}));

vi.mock('./hooks/useLocalStorage', () => {
  return {
    default: () => ['pikachu', vi.fn()],
  };
});

describe('MasterPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Renders the Form component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MasterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('searchButton')).toBeInTheDocument();
  });
});
