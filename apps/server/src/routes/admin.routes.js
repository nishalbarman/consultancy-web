import { Router } from "express";
import {
  getAdminContent,
  getAdminOrders,
  getAdminUsers,
  loginAdmin,
  updateCollection,
  updateAdsTxt,
  updateAppAdsTxt,
  updateLead,
  updateOrder,
  updateProfile,
  updateRobotsTxt,
} from "../controllers/admin.controller.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/content", requireAdmin, getAdminContent);
router.get("/orders", requireAdmin, getAdminOrders);
router.put("/orders/:id", requireAdmin, updateOrder);
router.get("/users", requireAdmin, getAdminUsers);
router.put("/ads-txt", requireAdmin, updateAdsTxt);
router.put("/app-ads-txt", requireAdmin, updateAppAdsTxt);
router.put("/robots-txt", requireAdmin, updateRobotsTxt);
router.put("/profile", requireAdmin, updateProfile);
router.put("/leads/:id", requireAdmin, updateLead);
router.put("/:collection", requireAdmin, updateCollection);

export default router;
