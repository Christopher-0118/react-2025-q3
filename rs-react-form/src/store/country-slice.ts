import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CountriesState } from './type';

const initialState: CountriesState = {
  list: [
    'Belarus',
    'Canada',
    'France',
    'Germany',
    'Italy',
    'Latvia',
    'Lithuania',
    'Poland',
    'Russia',
    'Spain',
    'Ukraine',
    'United Kingdom',
    'United States',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountry(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
  },
});

export const { setCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
