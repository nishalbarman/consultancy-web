import { AdminUser, User } from "../models/index.js";
import { verifyToken } from "../utils/token.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const payload = verifyToken(token);
    const Model = payload.role === "admin" ? AdminUser : User;
    const account = await Model.findById(payload.id);

    if (!account) {
      return res.status(401).json({ message: "Invalid authentication token." });
    }

    req.user = account;
    req.auth = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}
