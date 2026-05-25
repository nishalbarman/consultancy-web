import { Router } from "express";
import { createLead } from "../controllers/lead.controller.js";

const router = Router();

router.post("/create", createLead);

export default router;
