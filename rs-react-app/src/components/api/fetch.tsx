import { getResult } from './getResult';
import { getDescription } from './getDescription';
import type {
  Pokemon,
  PokemonListItem,
  PokemonResponse,
  Result,
} from '../../type';

const FetchData = async (
  term: string,
  setResults: (res: Result[]) => void,
  setError: (err: string | null) => void,
  setLoading: (loading: boolean) => void,
  page: number = 1,
  limit: number = 20
) => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  const offset = (page - 1) * limit;
  const paginatedURL = `${BASE_URL}?offset=${offset}&limit=${limit}`;
  try {
    setLoading(true);
    setError(null);

    const query = term.trim().toLowerCase();
    let results: Result[] = [];

    if (!query) {
      const data = await getResult<PokemonResponse>(paginatedURL);

      if (!data) throw new Error('expected an array');
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
};

export default FetchData;
