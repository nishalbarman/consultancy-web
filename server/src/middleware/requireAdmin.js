import { requireAuth } from "./requireAuth.js";

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.auth?.role !== "admin") {
      return res.status(403).json({ message: "Admin authorization required." });
    }
    next();
  });
}
