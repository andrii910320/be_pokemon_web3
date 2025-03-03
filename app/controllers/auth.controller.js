import { User } from "../schema/user/user.schema.js";
import { generateString } from "../utils/nonce.utils.js";
import Web3 from "web3";
import jwt from "jsonwebtoken";

const web3 = new Web3();

export const generateNonce = async (req, res) => {
  const { address } = req.params;

  try {
    let player = await User.findOne({ address });
    if (!player) {
      player = new User({
        address,
        nonce: generateString(),
      });
      await player.save();
    }
    res.json({ nonce: player.nonce });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifySign = async (req, res) => {
  const { address, signature } = req.body;
  try {
    const player = await User.findOne({ address });
    if (!player) {
      return res.status(400).json({ message: "User not found" });
    }
    const addressUser = web3.eth.accounts.recover(player.nonce, signature);

    if (player.address.toLowerCase() === addressUser.toLowerCase()) {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ address }, secretKey, { expiresIn: "1d" });

      player.nonce = generateString();
      await player.save();

      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
