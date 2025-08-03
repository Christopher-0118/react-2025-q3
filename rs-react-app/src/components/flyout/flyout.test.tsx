import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flyout from './flyout';
import { Provider } from 'react-redux';
import type { Item, ItemsState } from '../../store/type';

const initialState: ItemsState = {
  items: [],
};
const itemsSlice = createSlice({
  name: 'item',
  initialState: initialState,
  reducers: {},
});
const setupStore = (preloadedState: { item: { items: Item[] } }) =>
  configureStore({
    reducer: {
      item: itemsSlice.reducer,
    },
    preloadedState,
  });

describe('Flyout integration', () => {
  test('Does not displayed if store is empty', () => {
    const store = setupStore({ item: { items: [] } });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByTestId('flyout')).toBeNull();
  });

  test('Displays and show the number of selected items', () => {
    const store = setupStore({
      item: {
        items: [
          { id: 25, name: 'pikachu', description: 'Weight: 60, Height: 4' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByText(/Selected: 1/i)).toBeInTheDocument();
  });
});

describe('Download', () => {
  test('File name is correct', () => {
    const createObjectURLMock = vi.fn(() => 'blob:http://localhost/mock-url');
    const revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const store = setupStore({
      item: {
        items: [
          { id: 25, name: 'pikachu', description: 'Weight: 60, Height: 4' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadButton = screen.getByTestId('download-button');
    const clickMock = vi.fn();
    const link = document.createElement('a');
    link.click = clickMock;
    document.body.appendChild(link);

    const anchor = screen.getByTestId('hidden-link');
    if (anchor instanceof HTMLAnchorElement) {
      Object.defineProperty(anchor, 'click', {
        value: clickMock,
      });

      fireEvent.click(downloadButton);

      expect(createObjectURLMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
      expect(anchor.download).toBe('1_items.csv');
    }
  });
});
