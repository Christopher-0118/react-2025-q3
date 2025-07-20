/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './card';

describe('Rendering Tests', () => {
  test('Displays item name and description correctly', () => {
    render(<Card name={'bulbasaur'} description={'Weight: 69, Height: 7'} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Weight: 69, Height: 7')).toBeInTheDocument();
  });

  test('handles missing props gracefully', () => {
    render(<Card name={} description={} />);
    expect(screen.getByText('')).toBeInTheDocument();
  });
});
