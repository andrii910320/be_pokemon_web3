import { findActiveFightByUser } from "../schema/battle-room/battle-room.queries.js";
import { calculateDamage } from "./calculate-damage.js";

export const attack = async (ws, user) => {
  const activeBattle = await findActiveFightByUser(user);
  if (!activeBattle) {
    throw new Error("Choose a pokemon and start the battle");
  }

  if (activeBattle.move === "user") {
    const updatedBattle = await handleBattleMove(activeBattle, true);
    ws.send(JSON.stringify({ statusCode: 200, data: updatedBattle }));

    setTimeout(async () => {
      const activeBattle = await findActiveFightByUser(user);

      if (activeBattle?.move === "computer") {
        const updatedBattle = await handleBattleMove(activeBattle, false);
        ws.send(JSON.stringify({ statusCode: 200, data: updatedBattle }));
      }
    }, 1000);
  }
};

export const handleBattleMove = async (activeBattle, isUserMove) => {
  const attacker = isUserMove
    ? activeBattle.userPokemon
    : activeBattle.computerPokemon;
  const defender = isUserMove
    ? activeBattle.computerPokemon
    : activeBattle.userPokemon;
  const damage = calculateDamage(attacker);

  defender.base.HP -= damage;
  activeBattle.move = isUserMove ? "computer" : "user";

  if (defender.base.HP <= 0) {
    activeBattle.fightStatus = "completed";
    activeBattle.winner = isUserMove ? "user" : "computer";
    activeBattle.logs.push(`${attacker.name.english} win!`);
  } else {
    activeBattle.logs.push(
      `${attacker.name.english} attack ${
        defender.name.english
      } and cause harm: ${damage.toFixed(2)}HP`
    );
  }

  await activeBattle.save();

  return activeBattle;
};
