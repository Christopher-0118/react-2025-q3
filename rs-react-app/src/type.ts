import type { ReactNode } from 'react';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
export const ELEMENTS_PER_PAGE = 20;
export const BASE_PAGE = 1;
export type PokemonResponse = {
  count: number;
  results: PokemonListItem[];
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  weight: number;
  height: number;
};

export type Result = {
  name: string;
  description: string;
};

export type ResultsList = {
  results: Result[];
};

export type FormProps = {
  onSubmit: (query: string) => void;
  defaultValue: string;
};

export type PaginationProps = {
  currentPage: number;
  allPages: number;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};
