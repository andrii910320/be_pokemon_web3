import mongoose from "mongoose";
import { PokemonSchema } from "../pokemon/pokemon.schema.js";
import { User } from "../user/user.schema.js";
import { uuid } from "uuidv4";

const RoomBattleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  userPokemon: { type: PokemonSchema, required: true },
  computerPokemon: { type: PokemonSchema, required: true },
  move: { type: String, enum: ["user", "computer"], required: true },
  fightStatus: {
    type: String,
    enum: ["completed", "continue"],
    default: "continue",
  },
  winner: { type: String, enum: ["user", "computer"] },
  logs: { type: [String] },
});

export const BattleRoom = mongoose.model("BattleRoom", RoomBattleSchema);
