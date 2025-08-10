export type PokemonResponseList = {
  results: PokemonResponseItem[];
};

export type PokemonResponseItem = {
  name: string;
  url: string;
};

export type Item = {
  id: number;
  name: string;
  description: string;
};

export type ItemsState = {
  items: Item[];
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
