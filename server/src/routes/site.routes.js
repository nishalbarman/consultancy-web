import { Router } from "express";
import { getSiteContent } from "../controllers/site.controller.js";

const router = Router();

router.get("/", getSiteContent);

export default router;
