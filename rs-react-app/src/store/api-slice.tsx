import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_PAGE, BASE_URL, ELEMENTS_PER_PAGE } from './constant';
import type { Pokemon, PokemonResponse } from './type';
import type {
  PokemonDescription,
  PokemonDetails,
} from '../components/api/type';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getListItem: builder.query<
      PokemonResponse,
      { page: number; limit: number }
    >({
      query: ({ page = BASE_PAGE, limit = ELEMENTS_PER_PAGE }) => {
        const offset = (page - 1) * limit;
        return `?offset=${offset}&limit=${limit}`;
      },
    }),
    getItemDescription: builder.query<PokemonDescription, string>({
      query: (name) => `${name}`,

      transformResponse: (response: Pokemon): PokemonDescription => ({
        name: response.name,
        height: response.height,
        weight: response.weight,
      }),
    }),
    getItemDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: Pokemon): PokemonDetails => ({
        id: response.id,
        abilities: response.abilities,
      }),
    }),
  }),
});

export const {
  useGetListItemQuery,
  useGetItemDescriptionQuery,
  useGetItemDetailsQuery,
} = apiSlice;
export default apiSlice;
