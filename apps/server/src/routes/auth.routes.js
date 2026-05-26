import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRecaptcha } from "../middleware/requireRecaptcha.js";

const router = Router();

router.post("/register", requireRecaptcha, registerUser);
router.post("/login", requireRecaptcha, loginUser);
router.get("/me", requireAuth, getMe);

export default router;
