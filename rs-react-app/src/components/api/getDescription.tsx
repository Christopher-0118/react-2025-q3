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
      id: detailData.id,
      name: detailData.name,
      description: `Ability:\n ${abilities.join('\n')}`,
    };
  }

  if (!detailData.weight || !detailData.height) {
    throw new Error('Incomplete Pokémon data');
  }

  const { id, name, weight, height } = detailData;

  return {
    id: id,
    name: name,
    description: `Weight: ${weight}, Height: ${height}`,
  };
};
