import { Router } from "express";
import { getAdsTxt, getAppAdsTxt, getRobotsTxt, getSiteContent } from "../controllers/site.controller.js";

const router = Router();

router.get("/", getSiteContent);
router.get("/ads-txt", getAdsTxt);
router.get("/app-ads-txt", getAppAdsTxt);
router.get("/robots-txt", getRobotsTxt);

export default router;
