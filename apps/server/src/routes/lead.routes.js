import { Router } from "express";
import { createLead } from "../controllers/lead.controller.js";
import { requireRecaptcha } from "../middleware/requireRecaptcha.js";

const router = Router();

router.post("/create", requireRecaptcha, createLead);

export default router;
