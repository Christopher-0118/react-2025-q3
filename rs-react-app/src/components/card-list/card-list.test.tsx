import { render, screen } from '@testing-library/react';
import CardList from './card-list';
import { MemoryRouter } from 'react-router-dom';

describe('Rendering Tests', () => {
  const mockResults = [
    { name: 'Bulbasaur', description: 'Weight: 69, Height: 7' },
    { name: 'Charmander', description: 'Weight: 85, Height: 6' },
  ];

  test('Renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <CardList results={mockResults} />
      </MemoryRouter>
    );

    const cardsCount = screen.getAllByTestId('card');

    expect(cardsCount).toHaveLength(mockResults.length);
  });
});
