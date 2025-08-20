'use client';

import { useSearchParams } from 'next/navigation';
import CardList from '@/components/card-list/card-list';
import useLocalStorage from '@/hooks/useLocalStorage';
import Pagination from '@/components/pagination/pagination';
import Loading from '@/components/loading-progress/loading';
import { ELEMENTS_PER_PAGE } from '@/store/constant';
import {
  useGetItemDescriptionQuery,
  useGetListItemQuery,
} from '@/store/api-slice';

const MainContent = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const [lsQuery] = useLocalStorage('savedQuery', '');
  const urlQuery = (searchParams.get('query') ?? '').trim().toLowerCase();
  const searchQuery = urlQuery || lsQuery;

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

  const content = () => {
    if (isLoading) return <Loading />;
    if (error)
      return <p style={{ color: 'red' }}>`Error: Pokémon not found`</p>;
    if (data && Array.isArray(data.results))
      return <CardList results={data.results} />;
  };

  return (
    <div className="left-side">
      {content()}
      {!searchQuery && data && data.results.length > 1 && (
        <Pagination currentPage={page} allPages={6} />
      )}
    </div>
  );
};

export default MainContent;
