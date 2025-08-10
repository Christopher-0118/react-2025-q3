import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constant';
import type { Pokemon, PokemonResponseItem, Result, ResultsList } from './type';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getListItem: builder.query<ResultsList, { page: number; limit: number }>({
      queryFn: async ({ page, limit }) => {
        try {
          const offset = (page - 1) * limit;
          const listResponse = await fetch(
            `${BASE_URL}?offset=${offset}&limit=${limit}`
          );

          if (!listResponse.ok) throw new Error('Failed to fetch list');

          const listData = await listResponse.json();
          const descriptionPromises = listData.results.map(
            async (pokemon: PokemonResponseItem) => {
              const descriptionResponse = await fetch(pokemon.url);

              if (!descriptionResponse.ok)
                throw new Error('Failed to fetch description');

              const descriptionData = await descriptionResponse.json();

              return {
                id: descriptionData.id,
                name: pokemon.name,
                description: `Weight: ${descriptionData.weight}, Height: ${descriptionData.height}`,
              };
            }
          );

          const descriptionData = await Promise.all(descriptionPromises);
          return { data: { results: descriptionData } };
        } catch (err) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              statusText: (err as Error).message,
              data: null,
              error: (err as Error).message,
            },
          };
        }
      },
    }),
    getItemDescription: builder.query<ResultsList, { name: string }>({
      query: ({ name }) => `${name}`,
      transformResponse(response: Pokemon): ResultsList {
        return {
          results: [
            {
              id: response.id,
              name: response.name,
              description: `Weight: ${response.weight}, Height: ${response.height}`,
            },
          ],
        };
      },
    }),
    getItemDetails: builder.query<Result, { name: string }>({
      query: ({ name }) => `${name}`,
      transformResponse(response: Pokemon): Result {
        const abilities: string = response.abilities
          .map((item) => item.ability.name)
          .join(', ');
        return {
          id: response.id,
          name: response.name,
          description: `Abilities: ${abilities}`,
        };
      },
    }),
  }),
});

export const {
  useGetListItemQuery,
  useGetItemDescriptionQuery,
  useGetItemDetailsQuery,
} = apiSlice;
export default apiSlice;
