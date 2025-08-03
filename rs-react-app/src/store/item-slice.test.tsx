import reducer, { addItem, deleteItem } from './item-slice';

describe('Store integration', () => {
  const mockItem = {
    id: 25,
    name: 'pikachu',
    description: 'Weight: 60, Height: 4',
  };

  test('Initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ items: [] });
  });

  test('Add item to store', () => {
    const newState = reducer({ items: [] }, addItem(mockItem));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(mockItem);
  });

  test('Delete item from store', () => {
    const initialState = {
      items: [mockItem],
    };

    const newState = reducer(initialState, deleteItem(mockItem));

    expect(newState.items).toHaveLength(0);
  });
});
