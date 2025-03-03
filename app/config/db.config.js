import mongoose from "mongoose";
import { Pokemon } from "../schema/pokemon/pokemon.schema.js";
import axios from "axios";

export const connectToMongoDB = async () => {
  try {
    const url = process.env.CONNECT_TO_MONGODB;
    await mongoose.connect(url);
    const isPokemonUpload = await Pokemon.findOne({});
    if (!isPokemonUpload) {
      const URL =
        "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json";

      const response = await axios.get(URL);
      const data = response.data;
      await Pokemon.insertMany(data);
      console.log("Data successfully imported!");
    }
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error:", err);
  }
};
