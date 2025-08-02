export const getResult = async <T = unknown,>(query: string): Promise<T> => {
  const res = await fetch(query);

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();

  if (!data) {
    throw new Error('No data returned from API');
  }

  return data as T;
};
