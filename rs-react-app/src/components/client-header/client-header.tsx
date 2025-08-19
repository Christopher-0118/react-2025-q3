'use client';
import Search from '@/components/search/search';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import LanguageToggle from '../language-toggle/language-toggle';

const ClientHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('savedQuery', '');

  const handleSubmit = (query: string): void => {
    const customQuery = query.trim().toLowerCase();
    setSearchQuery(customQuery);

    const urlQuery = new URLSearchParams(searchParams.toString());
    if (customQuery) urlQuery.set('query', customQuery);
    else urlQuery.delete('query');
    urlQuery.set('page', '1');

    router.push(`/?${urlQuery.toString()}`);
  };

  return (
    <>
      <LanguageToggle />
      <Search onSubmit={handleSubmit} defaultValue={searchQuery} />
      <ThemeToggle />
    </>
  );
};

export default ClientHeader;
