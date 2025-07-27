import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Return defaulValue if LocalStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('searchQuery', ''));
    const [value] = result.current;
    expect(value).toBe('');
  });

  test('Use query from LocalStorage', () => {
    localStorage.setItem('searchQuery', 'pikachu');
    const { result } = renderHook(() => useLocalStorage('searchQuery', ''));
    const [value] = result.current;
    expect(value).toBe('pikachu');
  });

  test('Updates localStorage', async () => {
    const { result } = renderHook(() =>
      useLocalStorage('searchQuery', 'eevee')
    );

    await act(() => {
      const [, setValue] = result.current;
      setValue('bulbasaur');
    });

    const [newValue] = result.current;
    expect(newValue).toBe('bulbasaur');
    expect(localStorage.getItem('searchQuery')).toBe('bulbasaur');
  });
});
