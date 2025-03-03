import jwt from "jsonwebtoken";
import { findUserByAddress } from "../schema/user/user.queries.js";
import { start } from "../utils/start.js";
import { attack } from "../utils/attack.js";
import { isValidStatus } from "../utils/validate-status.js";

export const reactOnMessage = async (ws, message) => {
  try {
    const messageOBJ = JSON.parse(message);
    const { status, token, pokemonId } = messageOBJ;
    if (!isValidStatus(status)) {
      throw Error("Invalid status");
    }
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    const { address } = decoded;

    const user = await findUserByAddress(address);
    if (user) {
      const statusHandlers = {
        start: () => start(ws, pokemonId, user),
        attack: () => attack(ws, user),
      };
      await statusHandlers[status]();
    }
  } catch (err) {
    const message = err.message;
    ws.send(JSON.stringify({ status: "error", message }));
  }
};
