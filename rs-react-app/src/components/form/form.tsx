import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { FormProps } from './type';
import './form.css';

const Form = ({ onSubmit, defaultValue = '' }: FormProps) => {
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
        placeholder="Type the full name of the Pokémon"
        data-testid="input"
      ></input>
      <button className="search-button" data-testid="searchButton">
        Search
      </button>
    </form>
  );
};

export default Form;
