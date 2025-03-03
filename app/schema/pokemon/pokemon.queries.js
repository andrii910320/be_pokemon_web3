import { Pokemon } from "./pokemon.schema.js";

export const findPokemonById = async (id) => {
  try {
    const pokemon = await Pokemon.findOne({ id: +id });
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }
    return pokemon;
  } catch (err) {
    throw err;
  }
};

export const findAllByInvertType = async (types) => {
  try {
    const pokemons = await Pokemon.find({
      type: { $nin: [types] },
      base: { $exists: true },
    });
    return pokemons;
  } catch (err) {
    throw err;
  }
};
