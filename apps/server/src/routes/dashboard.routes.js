import { Router } from "express";
import { createOrder, getUserDashboard } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRecaptcha } from "../middleware/requireRecaptcha.js";

const router = Router();

router.get("/", requireAuth, getUserDashboard);
router.post("/orders", requireAuth, requireRecaptcha, createOrder);

export default router;
