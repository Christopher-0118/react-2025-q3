import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item, ItemsState } from './type';

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const { id, name, description } = action.payload;
      state.items.push({ id, name, description });
    },
    deleteItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, deleteItem, clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
