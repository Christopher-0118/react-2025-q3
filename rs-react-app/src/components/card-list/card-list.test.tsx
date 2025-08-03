import { render, screen } from '@testing-library/react';
import CardList from './card-list';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('Rendering Tests', () => {
  const mockResults = [
    { id: 1, name: 'Bulbasaur', description: 'Weight: 69, Height: 7' },
    { id: 4, name: 'Charmander', description: 'Weight: 85, Height: 6' },
  ];

  test('Renders correct number of items when data is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={mockResults} />
        </MemoryRouter>
      </Provider>
    );

    const cardsCount = screen.getAllByTestId('card');

    expect(cardsCount).toHaveLength(mockResults.length);
  });
});
