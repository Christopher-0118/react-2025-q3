'use client';
import Search from '@/components/search/search';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';

const ClientHeader = () => {
  return (
    <>
      <Search onSubmit={() => {}} defaultValue={''} />
      <ThemeToggle />
    </>
  );
};

export default ClientHeader;
