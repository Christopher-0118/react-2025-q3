import { useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  defaultValue: string
): [key: string, (value: string) => void] => {
  const query: string = localStorage.getItem(key) || defaultValue;
  const [value, setValue] = useState<string>(query);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
