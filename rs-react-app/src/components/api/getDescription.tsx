import { getResult } from './getResult';
import type { Pokemon, Result } from '../../type';

export const getDescription = async (url: string): Promise<Result> => {
  const detailData = await getResult<Pokemon>(url);

  if (!detailData?.name || !detailData?.weight || !detailData?.height) {
    throw new Error('Incomplete Pokémon data');
  }

  return {
    name: detailData.name,
    description: `Weight: ${detailData.weight}, Height: ${detailData.height}`,
  };
};
