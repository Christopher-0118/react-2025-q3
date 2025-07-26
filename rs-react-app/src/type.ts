// Ответ от API для списка покемонов
export type PokemonResponse = {
  count: number;
  results: PokemonListItem[];
};

// Каждый отдельный покемон из списка
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

// export interface IFormState {
//   query: string;
// }

// export interface IFormProps {
//   onSubmit: (query: string) => void;
//   defaultValue: string;
// }

// export interface IResultProps {
//   results: Result[];
// }

// export interface IErrorBoundaryState {
//   hasError: boolean;
// }

// export interface IErrorBoundaryProps {
//   children: ReactNode;
// }
