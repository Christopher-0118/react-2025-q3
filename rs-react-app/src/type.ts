import type { ReactNode } from 'react';

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
  // OnPageChange: (page: number) => void;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};
