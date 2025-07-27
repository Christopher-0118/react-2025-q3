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

export interface ResultsList {
  results: Result[];
}

export type FormProps = {
  onSubmit: (query: string) => void;
  defaultValue: string;
};

// export interface IErrorBoundaryState {
//   hasError: boolean;
// }

// export interface IErrorBoundaryProps {
//   children: ReactNode;
// }
