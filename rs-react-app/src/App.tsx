import { useEffect, useState } from 'react';
import {
  type Pokemon,
  type PokemonListItem,
  type PokemonResponse,
  type Result,
} from './type';
import Form from './components/form/form';
import CardList from './components/card-list/card-list';
import ErrorButton from './components/error-button/error-button';
import './App.css';

const App = () => {
  const savedQuery = localStorage.getItem('searchQuery') || '';
  const [searchQuery, setSearchQuery] = useState<string>(savedQuery);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData(searchQuery);
  }, []); // solve this issue!!!

  const fetchData = async (term: string) => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

    try {
      setLoading(true);
      setError(null);

      const query = term.trim().toLowerCase();
      let results: Result[] = [];

      if (!query) {
        const data = await getResult<PokemonResponse>(BASE_URL);

        if (!Array.isArray(data)) throw new Error('expected an array');
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

  const getResult = async <T = unknown,>(query: string): Promise<T> => {
    const res = await fetch(query);

    if (!res.ok) throw new Error('Pokémon not found');

    const data = await res.json();

    if (!data || typeof data !== 'object') throw new Error(`No data from API`);

    return data as T;
  };

  const getDescription = async (url: string): Promise<Result> => {
    const detailData = await getResult<Pokemon>(url);

    return {
      name: detailData.name,
      description: `Weight: ${detailData.weight}, Height: ${detailData.height}`,
    };
  };

  const handleSubmit = (query: string): void => {
    localStorage.setItem('searchQuery', query);
    setSearchQuery(query);
    fetchData(query);
  };

  const content = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (Array.isArray(results) && results.length)
      return <CardList results={results} />;
  };

  return (
    <>
      <header className="header">
        <Form onSubmit={handleSubmit} defaultValue={searchQuery} />
      </header>
      <main className="main">
        {content()}
        <ErrorButton />
      </main>
    </>
  );
};

export default App;
