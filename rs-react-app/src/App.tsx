import { useEffect, useState } from 'react';
import { type Result } from './type';
import Form from './components/form/form';
import CardList from './components/card-list/card-list';
import './App.css';
import { fetchData } from './components/api/fetch';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('savedQuery', '');
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (query: string): void => {
    setSearchQuery(query);
    fetchData(query, setResults, setError, setLoading);
  };
  const content = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (Array.isArray(results) && results.length)
      return <CardList results={results} />;
  };

  useEffect(() => {
    fetchData(searchQuery, setResults, setError, setLoading);
  }, []);

  return (
    <>
      <header className="header">
        <Form onSubmit={handleSubmit} defaultValue={searchQuery} />
      </header>
      <main className="main">{content()}</main>
    </>
  );
};

export default App;
