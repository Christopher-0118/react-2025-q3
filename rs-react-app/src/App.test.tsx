/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import FetchData from './components/api/fetch';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./components/api/fetch', () => ({
  default: vi.fn(),
}));

vi.mock('./hooks/useLocalStorage', () => {
  return {
    default: () => ['pikachu', vi.fn()],
  };
});

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form and allows submitting a query', async () => {
    const mockFetch = FetchData as ReturnType<typeof vi.fn>;
    mockFetch.mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), 'bulbasaur');
    await userEvent.click(screen.getByRole('button'));

    expect(mockFetch).toHaveBeenCalledWith(
      'bulbasaur',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });

  test('shows pagination when more than one result is returned', async () => {
    const mockResults = [
      { name: 'pikachu', description: 'electric mouse' },
      { name: 'bulbasaur', description: 'grass poison' },
    ];

    const mockFetch = FetchData as ReturnType<typeof vi.fn>;
    mockFetch.mockImplementation((_, setResults) => {
      setResults(mockResults);
    });

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId('pagination')).toBeInTheDocument()
    );
  });
});
