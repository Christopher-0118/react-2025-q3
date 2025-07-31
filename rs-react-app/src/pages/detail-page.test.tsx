/// <reference types="vitest/globals" />
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FetchData from '../components/api/fetch';
import DetailsPage from './detail-page';
import * as router from 'react-router-dom';

vi.mock('../components/api/fetch', () => ({
  default: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Rendering Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('DetailsPage renders', async () => {
    const mockFetch = FetchData as ReturnType<typeof vi.fn>;

    mockFetch.mockImplementation((_name, setResult, _err, setLoading) => {
      setLoading(false);
      setResult([{ name: 'pikachu', description: 'electric mouse' }]);
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu/details']}>
        <Routes>
          <Route path="/pokemon/:name/details" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('details')).toBeInTheDocument();
  });

  test('Call fetchData when the component mounts', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu/details']}>
        <Routes>
          <Route path="/pokemon/:name/details" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(FetchData).toHaveBeenCalled();
  });

  test('Button closes details page', () => {
    const mockNavigate = vi.fn();
    (router.useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu/details']}>
        <Routes>
          <Route path="/pokemon/:name/details" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = screen.getByTestId('button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
