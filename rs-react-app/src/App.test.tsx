/// <reference types="vitest/globals" />
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Retrieves saved search term on component mount', () => {
    localStorage.setItem('searchQuery', 'psyduck');
    render(<App />);

    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 'charmander' } });
    expect(input).toHaveValue('charmander');
  });
});
