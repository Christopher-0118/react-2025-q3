/// <reference types="vitest/globals" />
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from './App';

describe('LocalStorage Integration', () => {
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

describe('Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'pikachu');

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => ({
        name: 'pikachu',
        weight: 60,
        height: 4,
      }),
    });

    global.fetch = mockFetch as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });

  test('Manages loading states during API calls', async () => {
    localStorage.setItem('searchQuery', 'abracadabra');

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => ({
        name: 'pikachu',
        weight: 60,
        height: 4,
      }),
    });

    global.fetch = mockFetch as unknown as typeof fetch;

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('handles error if fetch fails', async () => {
    localStorage.setItem('searchQuery', '');
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
    }) as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error: 503/i)).toBeInTheDocument();
    });
  });

  test('displays list of cards', async () => {
    localStorage.setItem('searchQuery', '');

    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { name: 'bulbasaur', url: 'url-1' },
            { name: 'charmander', url: 'url-2' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'bulbasaur',
          weight: 69,
          height: 7,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'charmander',
          weight: 85,
          height: 6,
        }),
      });

    global.fetch = mockFetch as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 69, Height: 7/i)).toBeInTheDocument();

      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 85, Height: 6/i)).toBeInTheDocument();
    });
  });
});
