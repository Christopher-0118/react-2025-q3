import itemsSlice from './item-slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { item: itemsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
