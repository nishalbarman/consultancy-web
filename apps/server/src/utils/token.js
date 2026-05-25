import jwt from "jsonwebtoken";
import { adminConfig } from "../config/auth.js";

export function signToken(payload) {
  return jwt.sign(payload, adminConfig.jwtSecret, { expiresIn: adminConfig.jwtExpiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, adminConfig.jwtSecret);
}
