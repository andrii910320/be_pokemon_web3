import express from "express";
import { pokemonList } from "../controllers/pokemons.controller.js";

const routerPokemon = express.Router();

routerPokemon.get("/:page/:limit", pokemonList);

export default routerPokemon;
