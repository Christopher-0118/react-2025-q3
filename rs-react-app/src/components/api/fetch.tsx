// src/api/fetchData.ts

import { getResult } from './getResult';
import { getDescription } from './getDescription';
import type {
  Pokemon,
  PokemonListItem,
  PokemonResponse,
  Result,
} from '../../type';

export const fetchData = async (
  term: string,
  setResults: (res: Result[]) => void,
  setError: (err: string | null) => void,
  setLoading: (loading: boolean) => void
) => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  try {
    setLoading(true);
    setError(null);

    const query = term.trim().toLowerCase();
    let results: Result[] = [];

    if (!query) {
      const data = await getResult<PokemonResponse>(BASE_URL);

      //if (!data) throw new Error('expected an array');
      const promises = await data.results.map((pokemon: PokemonListItem) =>
        getDescription(pokemon.url)
      );

      results = await Promise.all(promises);
    } else {
      const data = await getResult<Pokemon>(BASE_URL.concat(query));

      results = [
        {
          name: data.name,
          description: `Weight: ${data.weight}, Height: ${data.height}`,
        },
      ];
    }

    setResults(results);
  } catch (error: unknown) {
    if (error instanceof Error) setError(error.message);
  } finally {
    setLoading(false);
  }
  // try {
  //   setLoading(true);
  //   setError(null);

  //   const query = term.trim().toLowerCase();
  //   let results: Result[] = [];

  //   if (!query) {
  //     const data = await getResult<PokemonResponse>(BASE_URL);

  //     if (!data?.results || !Array.isArray(data.results)) {
  //       throw new Error('Invalid response format: missing results array');
  //     }

  //     const promises = data.results.map((pokemon: PokemonListItem) =>
  //       getDescription(pokemon.url)
  //     );

  //     results = await Promise.all(promises);
  //   } else {
  //     const data = await getResult<Pokemon>(BASE_URL + query);

  //     if (!data?.name || !data?.weight || !data?.height) {
  //       throw new Error('Incomplete Pokémon data');
  //     }

  //     results = [
  //       {
  //         name: data.name,
  //         description: `Weight: ${data.weight}, Height: ${data.height}`,
  //       },
  //     ];
  //   }

  //   setResults(results);
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     setError(error.message);
  //   } else {
  //     setError('Unknown error');
  //   }
  // } finally {
  //   setLoading(false);
  // }
  //-------------------------
};
