import { Provider } from 'react-redux';
import * as apiSlice from '../store/api-slice';
import * as router from 'react-router-dom';
import { store } from '../store/store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from './detail-page';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('../store/api-slice', async () => {
  const actual = await vi.importActual('../store/api-slice');
  return {
    ...actual,
    useGetItemDetailsQuery: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(), // замокаем useNavigate как мок-функцию
  };
});

describe('Rendering Tests', () => {
  const useGetItemDetailsQueryMock =
    apiSlice.useGetItemDetailsQuery as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Button closes details page', () => {
    useGetItemDetailsQueryMock.mockReturnValue({
      data: {
        id: 25,
        name: 'pikachu',
        description: 'Abilities: static, lightning-rod',
      },
      error: null,
      isLoading: false,
    });

    const mockNavigate = vi.fn();
    (router.useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pikachu/details']}>
          <Routes>
            <Route path="/pokemon/:name/details" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByTestId('button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
