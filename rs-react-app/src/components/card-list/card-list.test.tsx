import { render, screen } from '@testing-library/react';
import CardList from './card-list';

describe('Rendering Tests', () => {
  const mockResults = [
    { name: 'Bulbasaur', description: 'Weight: 69, Height: 7' },
    { name: 'Charmander', description: 'Weight: 85, Height: 6' },
  ];

  test('Renders correct number of items when data is provided', () => {
    render(<CardList results={mockResults} />);

    const cardsCount = screen.getAllByTestId('card');

    expect(cardsCount).toHaveLength(mockResults.length);
  });
});
