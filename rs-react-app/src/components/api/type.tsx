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
