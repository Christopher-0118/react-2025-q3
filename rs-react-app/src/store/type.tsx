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
  img: string;
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
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
      };
    };
  };
};

export type Result = {
  id: number;
  name: string;
  description: string;
  img?: string;
};

export type ResultsList = {
  results: Result[];
};
