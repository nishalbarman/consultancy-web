import { Router } from "express";
import { getAdsTxt, getAppAdsTxt, getRobotsTxt, getSiteContent } from "../controllers/site.controller.js";
import { getPublicPage } from "../controllers/customPage.controller.js";

const router = Router();

router.get("/", getSiteContent);
router.get("/ads-txt", getAdsTxt);
router.get("/app-ads-txt", getAppAdsTxt);
router.get("/robots-txt", getRobotsTxt);
router.get("/pages/:slug", getPublicPage);

export default router;
