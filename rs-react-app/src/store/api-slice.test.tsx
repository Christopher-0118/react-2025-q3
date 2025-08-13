/// <reference types="vitest/globals" />
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api-slice';
import { BASE_URL } from './constant';

global.fetch = vi.fn();

function makeStore() {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

describe('apiSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('getListItem', async () => {
    const mockGetListItem = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [{ name: 'pikachu', url: `${BASE_URL}25` }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 25, weight: 60, height: 4 }),
      });

    global.fetch = mockGetListItem;

    const store = makeStore();

    await store.dispatch(
      apiSlice.endpoints.getListItem.initiate({ page: 1, limit: 1 })
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}?offset=0&limit=1`);
  });

  // test('getItemDetails', async () => {
  //   global.fetch = vi.fn().mockResolvedValue({
  //     ok: true,
  //     status: 200,
  //     json: async () => ({
  //       id: 25,
  //       name: 'pikachu',
  //       abilities: [
  //         { ability: { name: 'static' } },
  //         { ability: { name: 'lightning-rod' } },
  //       ],
  //     }),
  //   });

  //   const store = makeStore();

  //   const resultAction = await store.dispatch(
  //     apiSlice.endpoints.getItemDetails.initiate({ name: 'pikachu' })
  //   );

  //   expect(fetch).toHaveBeenCalledTimes(1);

  //   const firstCallArg = (fetch as any).mock.calls[0][0];
  //   const url =
  //     typeof firstCallArg === 'string' ? firstCallArg : firstCallArg.url;

  //   expect(url).toBe(`${BASE_URL}pikachu`);

  //   expect(resultAction.error).toBeUndefined();
  //   expect(resultAction.data).toEqual({
  //     id: 25,
  //     name: 'pikachu',
  //     description: 'Abilities: static, lightning-rod',
  //   });
  // });
});
