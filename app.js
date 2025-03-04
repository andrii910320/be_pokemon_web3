import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./app/config/db.config.js";
import routerAuth from "./app/routes/auth.route.js";
import routerPokemon from "./app/routes/pokemon-list.js";
import responseFormatter from "./app/middleware/responseFormat.js";
import WebSocket from "ws";
import { createServer } from "http";
import cors from "cors";
import { reactOnMessage } from "./app/controllers/battle.controller.js";
import { authInterceptor } from "./app/middleware/auth.js";

dotenv.config();

const app = express();

connectToMongoDB();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);
app.use(express.json());
app.use(authInterceptor, responseFormatter);

app.use("/auth", routerAuth);
app.use("/pokemons", routerPokemon);

const server = createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  ws.on("message", (message) => reactOnMessage(ws, message));
  ws.on("error", (error) => {
    console.log(error.message);
  });
});
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
