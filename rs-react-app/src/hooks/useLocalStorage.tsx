'use client';
import { useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  defaultValue: string
): [key: string, (value: string) => void] => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(storedValue);
      }
    }
  }, [key]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
