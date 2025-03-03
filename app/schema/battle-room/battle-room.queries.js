import { BattleRoom } from "./battle-room.schema.js";

export const findActiveFightByUser = async (user) => {
  try {
    const activeBattle = await BattleRoom.findOne({
      user: user._id,
      fightStatus: "continue",
    });
    return activeBattle;
  } catch (err) {
    throw err;
  }
};
