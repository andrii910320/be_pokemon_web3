import express from "express";
import { generateNonce, verifySign } from "../controllers/auth.controller.js";
import Joi from "joi";
import { userSchema, validateBody } from "../validators/verify.dto.js";

const routerAuth = express.Router();

routerAuth.get("/nonce/:address", generateNonce);

routerAuth.post("/login", validateBody(userSchema), verifySign);

export default routerAuth;
