/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from '../../App';

describe('Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('handles error if fetch fails', async () => {
    localStorage.setItem('searchQuery', '');
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

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

    global.fetch = mockFetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 69, Height: 7/i)).toBeInTheDocument();

      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 85, Height: 6/i)).toBeInTheDocument();
    });
  });
});
