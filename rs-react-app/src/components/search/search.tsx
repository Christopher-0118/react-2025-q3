'use client';
import { useTranslations } from 'next-intl';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { SearchProps } from './type';
import './search.css';

const Search = ({ onSubmit, defaultValue = '' }: SearchProps) => {
  const searchUi = useTranslations('Header');
  const [query, setQuery] = useState<string>(defaultValue);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <form className="control-panel" role="form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search-input"
        value={query}
        onChange={handleChange}
        placeholder={searchUi('searchPlaceholder')}
        data-testid="input"
      ></input>
      <button className="search-button" data-testid="searchButton">
        {searchUi('searchButton')}
      </button>
    </form>
  );
};

export default Search;
