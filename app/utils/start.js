import { findPokemonById } from "../schema/pokemon/pokemon.queries.js";
import { BattleRoom } from "../schema/battle-room/battle-room.schema.js";
import { chooseEnemy } from "../utils/choose-enemy.queries.js";
import { findActiveFightByUser } from "../schema/battle-room/battle-room.queries.js";
import { handleBattleMove } from "./attack.js";

export const start = async (ws, pokemonId, user) => {
  const userPokemon = await findPokemonById(pokemonId);
  const computerPokemon = await chooseEnemy(userPokemon);
  const diffSpeed = userPokemon.base.Speed - computerPokemon.base.Speed;
  const activeBattle = await findActiveFightByUser(user);

  if (activeBattle) {
    ws.send(
      JSON.stringify({
        statusCode: 400,
        message: "You have not finished fight",
      })
    );
    ws.send(JSON.stringify({ statusCode: 200, data: activeBattle }));
    return;
  }

  const battleRoom = new BattleRoom({
    userPokemon,
    computerPokemon,
    move: diffSpeed < 0 ? "computer" : "user",
    user,
  });
  battleRoom.save();
  ws.send(JSON.stringify({ statusCode: 200, data: battleRoom }));

  if (battleRoom && battleRoom.move === "computer") {
    setTimeout(async () => {
      const activeBattle = await findActiveFightByUser(user);
      if (activeBattle.move === "computer") {
        const updatedBattle = await handleBattleMove(activeBattle, false);
        ws.send(JSON.stringify({ statusCode: 200, data: updatedBattle }));
      }
    }, 1000);
  }
};
