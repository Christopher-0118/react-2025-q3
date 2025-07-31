import { useEffect, useState } from 'react';
import { type Result } from '../components/api/type';
import Form from '../components/form/form';
import CardList from '../components/card-list/card-list';
import FetchData from '../components/api/fetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Pagination from '../components/pagination/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import './master.css';
import Loading from '../components/loading-progress.tsx/loading';

const MasterPage = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('savedQuery', '');
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;

  const handleSubmit = (query: string): void => {
    setSearchQuery(query);
    FetchData(query, setResults, setError, setLoading);
  };

  const content = () => {
    if (loading) return <Loading />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (Array.isArray(results) && results.length)
      return <CardList results={results} />;
  };

  useEffect(() => {
    FetchData(searchQuery, setResults, setError, setLoading, page, limit);
  }, [searchQuery, page]);

  return (
    <>
      <header className="header">
        <Form onSubmit={handleSubmit} defaultValue={searchQuery} />
      </header>
      <main className="main">
        <div className="left-side">
          {content()}
          {results.length > 1 && <Pagination currentPage={page} allPages={6} />}
        </div>
        <div className="right-side">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MasterPage;
