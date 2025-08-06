import type { DESCRIPTION, DETAILS } from './constant';

export type PokemonResponse = {
  count: number;
  results: PokemonListItem[];
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
};

export type Result = {
  id: number;
  name: string;
  description: string;
};

export type ResultsList = {
  results: Result[];
};

export type FetchArgs = {
  term: string;
  setResults: (res: Result[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  page?: number;
  limit?: number;
  mode?: typeof DESCRIPTION | typeof DETAILS;
};
