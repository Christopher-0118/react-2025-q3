/// <reference types="vitest/globals" />
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Form Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'Eevee');
    render(<App />);
    const input = screen.getByPlaceholderText(
      'Type the full name of the Pokémon'
    );
    expect(input).toHaveValue('Eevee');
  });
});

describe('User Interaction Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Saves search term to localStorage when search button is clicked', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      'Type the full name of the Pokémon'
    );
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.submit(form);

    expect(localStorage.getItem('searchQuery')).toBe('charmander');
  });

  test('Trims whitespace from search input before saving', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      'Type the full name of the Pokémon'
    );
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: ' bulbasaur ' } });
    fireEvent.submit(form);

    expect(localStorage.getItem('searchQuery')).toBe(' bulbasaur ');
  });
});

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Overwrites existing localStorage value when new search is performed', () => {
    localStorage.setItem('searchQuery', 'meowth');
    render(<App />);

    const input = screen.getByPlaceholderText(
      'Type the full name of the Pokémon'
    );
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'psyduck' } });
    fireEvent.submit(form);

    expect(localStorage.getItem('searchQuery')).toBe('psyduck');
  });

  test('Retrieves saved search term on component mount', () => {
    localStorage.setItem('searchQuery', 'psyduck');
    render(<App />);

    const input = screen.getByPlaceholderText(
      'Type the full name of the Pokémon'
    );

    fireEvent.change(input, { target: { value: 'charmander' } });
    expect(input).toHaveValue('charmander');
  });
});
