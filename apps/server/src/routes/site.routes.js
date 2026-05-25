import { Router } from "express";
import { getAdsTxt, getSiteContent } from "../controllers/site.controller.js";

const router = Router();

router.get("/", getSiteContent);
router.get("/ads-txt", getAdsTxt);

export default router;
