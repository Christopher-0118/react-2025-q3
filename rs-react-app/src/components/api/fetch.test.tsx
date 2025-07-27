/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { getResult } from './getResult';
import { getDescription } from './getDescription';
import type { Pokemon, PokemonResponse } from '../../type';
import FetchData from './fetch';

vi.mock('./getResult', () => ({
  getResult: vi.fn(),
}));

vi.mock('./getDescription', () => ({
  getDescription: vi.fn(),
}));

describe('Integration Tests', () => {
  const setResults = vi.fn();
  const setError = vi.fn();
  const setLoading = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('fetches a specific Pokemon when a search term is provided', async () => {
    const mockPokemon: Pokemon = {
      name: 'pikachu',
      weight: 60,
      height: 4,
    };

    (getResult as vi.Mock).mockResolvedValue(mockPokemon);

    await FetchData('pikachu', setResults, setError, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(getResult).toHaveBeenCalledWith(
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

  test('fetches paginated Pokemon list when no search term is provided', async () => {
    const mockList: PokemonResponse = {
      count: 2,
      results: [
        { name: 'bulbasaur', url: 'url1' },
        { name: 'charmander', url: 'url2' },
      ],
    };

    const mockDescriptions = [
      { name: 'bulbasaur', description: 'desc1' },
      { name: 'charmander', description: 'desc2' },
    ];

    (getResult as vi.Mock).mockResolvedValue(mockList);
    (getDescription as vi.Mock).mockImplementation((url: string) => {
      if (url === 'url1') return mockDescriptions[0];
      if (url === 'url2') return mockDescriptions[1];
    });

    await FetchData('', setResults, setError, setLoading, 1, 20);

    expect(getResult).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    );
    expect(getDescription).toHaveBeenCalledTimes(2);
    expect(setResults).toHaveBeenCalledWith(mockDescriptions);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
