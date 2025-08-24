import { configureStore } from '@reduxjs/toolkit';
import formSlice from '@/store/form-slice';
import countriesSlice from '@/store/country-slice';

export const store = configureStore({
  reducer: { form: formSlice, country: countriesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
