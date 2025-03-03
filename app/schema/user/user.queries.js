import { User } from "./user.schema.js";

export const findUserByAddress = async (address) => {
  try {
    const pokemon = await User.findOne({ address });
    if (!pokemon) {
      throw new Error("User not found");
    }
    return pokemon;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (address, data) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { address },
      { $set: data },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw err;
  }
};
