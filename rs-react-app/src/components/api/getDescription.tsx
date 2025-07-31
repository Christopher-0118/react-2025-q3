import { DETAILS } from './constant';
import { getResult } from './getResult';
import type { Pokemon, Result } from './type';

export const getDescription = async (
  url: string,
  mode: string
): Promise<Result> => {
  const detailData = await getResult<Pokemon>(url);

  if (!detailData.name) {
    throw new Error('Incomplete Pokémon data');
  }

  if (mode === DETAILS && detailData.abilities) {
    const abilities = detailData.abilities.map((abils) => abils.ability.name);
    return {
      name: detailData.name,
      description: `Ability:\n ${abilities.join('\n')}`,
    };
  }

  if (!detailData.weight || !detailData.height) {
    throw new Error('Incomplete Pokémon data');
  }

  const { weight, height } = detailData;

  return {
    name: detailData.name,
    description: `Weight: ${weight}, Height: ${height}`,
  };
};
