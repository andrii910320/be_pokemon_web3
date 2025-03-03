import { Pokemon } from "../schema/pokemon/pokemon.schema.js";

export const pokemonList = async (req, res) => {
  const { page, limit } = req.params;

  const skip = (page - 1) * limit;
  const pokemons = await Pokemon.find().skip(skip).limit(limit).exec();
  const total = await Pokemon.countDocuments();
  res.send({ page: +page, limit: +limit, total, pokemons });
};
