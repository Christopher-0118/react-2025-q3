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
      console.log('add:', action);
    },
    deleteItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      console.log('delete:', action);
    },
  },
});

export const { addItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
