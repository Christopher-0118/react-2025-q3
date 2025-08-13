import Search from '../components/search/search';
import CardList from '../components/card-list/card-list';
import useLocalStorage from '../hooks/useLocalStorage';
import Pagination from '../components/pagination/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import Loading from '../components/loading-progress.tsx/loading';
import Flyout from '../components/flyout/flyout';
import { ELEMENTS_PER_PAGE } from '../store/constant';
import ThemeToggle from '../components/theme-toggle/theme-toggle';
import {
  useGetItemDescriptionQuery,
  useGetListItemQuery,
} from '../store/api-slice';
import './master.css';
import { All_PAGES } from '../components/pagination/constatn';

const MasterPage = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('savedQuery', '');
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const listItems = useGetListItemQuery({
    page: page,
    limit: ELEMENTS_PER_PAGE,
  });
  const item = useGetItemDescriptionQuery(
    { name: searchQuery },
    { skip: !searchQuery }
  );

  const data = searchQuery ? item.data : listItems.data;
  const error = searchQuery ? item.error : listItems.error;
  const isLoading = searchQuery ? item.isLoading : listItems.isLoading;

  const handleSubmit = (query: string): void => {
    setSearchQuery(query.trim().toLowerCase());
  };

  const content = () => {
    if (isLoading) return <Loading />;
    if (error)
      return <p style={{ color: 'red' }}>`Error: Pokémon not found`</p>;
    if (data && Array.isArray(data.results))
      return <CardList results={data.results} />;
  };

  return (
    <>
      <header className="header">
        <Search onSubmit={handleSubmit} defaultValue={searchQuery} />
        <ThemeToggle />
      </header>
      <main className="main">
        <div className="left-side">
          {content()}
          {!searchQuery && data && data.results.length > 1 && (
            <Pagination currentPage={page} allPages={All_PAGES} />
          )}
        </div>
        <div className="right-side">
          <Outlet />
          <Flyout />
        </div>
      </main>
    </>
  );
};

export default MasterPage;
