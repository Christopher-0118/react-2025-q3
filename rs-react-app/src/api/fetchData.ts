import { COUNTRY_URL } from '@/api/constant';
import type { DataMap } from './type';
import normalize from './normalize';

let cache: Promise<DataMap> | null = null;
const fetchData = async (): Promise<DataMap> => {
  try {
    const res = await fetch(COUNTRY_URL);

    if (!res.ok) throw new Error(`Error: Failed to fetch CO₂ data`);

    const raw = await res.json();
    const data = normalize(raw);

    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    throw error;
  }
};

export const dataPromise: Promise<DataMap> = (cache ??= fetchData());
