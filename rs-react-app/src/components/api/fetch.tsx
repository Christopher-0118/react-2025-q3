import { getResult } from './getResult';
import { getDescription } from './getDescription';
import {
  type FetchArgs,
  type PokemonListItem,
  type PokemonResponse,
  type Result,
} from './type';
import {
  BASE_PAGE,
  BASE_URL,
  ELEMENTS_PER_PAGE,
  DESCRIPTION,
} from './constant';

const fetchData = async ({
  term,
  setResults,
  setError,
  setLoading,
  page = BASE_PAGE,
  limit = ELEMENTS_PER_PAGE,
  mode = DESCRIPTION,
}: FetchArgs) => {
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
        getDescription(pokemon.url, mode)
      );

      results = await Promise.all(promises);
    } else {
      const result = await getDescription(BASE_URL.concat(query), mode);
      results = [result];
    }

    setResults(results);
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
};

export default fetchData;
