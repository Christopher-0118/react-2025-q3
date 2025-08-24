import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormState, FormPayload } from './type';

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // проверь тип пейлоада!
    addForm: (state, action: PayloadAction<FormPayload>) => {
      const form = {
        id: Date.now().toString(),
        source: action.payload.source,
        data: action.payload.data,
      };
      state.forms.push(form);
    },
  },
});

export const { addForm } = formSlice.actions;
export default formSlice.reducer;
