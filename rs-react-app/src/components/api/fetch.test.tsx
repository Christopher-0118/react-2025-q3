/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import FetchData from './fetch';

const setResults = vi.fn();
const setError = vi.fn();
const setLoading = vi.fn();

describe('API integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    setResults.mockReset();
    setError.mockReset();
    setLoading.mockReset();
  });

  test('Fetches Pokemon when a search term is provided', async () => {
    const mockGetResult = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => ({ name: 'pikachu', weight: 60, height: 4 }),
    });

    global.fetch = mockGetResult;
    await FetchData('pikachu', setResults, setError, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(mockGetResult).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
    expect(setResults).toHaveBeenCalledWith([
      {
        name: 'pikachu',
        description: 'Weight: 60, Height: 4',
      },
    ]);
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  test('Fetches paginated Pokemon list when no search term is provided', async () => {
    const mockGetResult = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { name: 'bulbasaur', url: 'url-1' },
            { name: 'charmander', url: 'url-2' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'bulbasaur',
          weight: 69,
          height: 7,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'charmander',
          weight: 85,
          height: 6,
        }),
      });

    global.fetch = mockGetResult;

    await FetchData('', setResults, setError, setLoading, 1, 20);

    expect(mockGetResult).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    );
    expect(mockGetResult).toHaveBeenCalledTimes(3);
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  test('handles error if fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

    await FetchData('', setResults, setError, setLoading, 1, 20);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setError).toHaveBeenCalledWith('Error: 503');
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
