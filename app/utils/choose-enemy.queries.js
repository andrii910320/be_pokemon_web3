import { findAllByInvertType } from "../schema/pokemon/pokemon.queries.js";

export const chooseEnemy = async (pokemon) => {
  const types = pokemon.type;
  const pokemons = await findAllByInvertType(types);
  const randomValue = Math.floor(Math.random() * pokemons.length) + 1;
  return pokemons[randomValue];
};
