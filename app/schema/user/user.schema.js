import mongoose from "mongoose";
import { BattleRoom } from "../battle-room/battle-room.schema.js";

const UserSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nonce: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);
