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
import {
  createItem,
  updateItem,
  deleteItem,
  getCollectionItems,
} from "../controllers/admin.crud.js";
import {
  getCustomPages,
  createCustomPage,
  updateCustomPage,
  deleteCustomPage,
} from "../controllers/customPage.controller.js";
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

// Bulk replace (legacy)
router.put("/:collection", requireAdmin, updateCollection);

// Individual CRUD
router.get("/:collection/items", requireAdmin, getCollectionItems);
router.post("/:collection/items", requireAdmin, createItem);
router.put("/:collection/items/:id", requireAdmin, updateItem);
router.delete("/:collection/items/:id", requireAdmin, deleteItem);

// Custom pages
router.get("/pages", requireAdmin, getCustomPages);
router.post("/pages", requireAdmin, createCustomPage);
router.put("/pages/:id", requireAdmin, updateCustomPage);
router.delete("/pages/:id", requireAdmin, deleteCustomPage);

export default router;
