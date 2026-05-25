import { Router } from "express";
import { createOrder, getUserDashboard } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", requireAuth, getUserDashboard);
router.post("/orders", requireAuth, createOrder);

export default router;
