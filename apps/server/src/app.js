import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import siteRoutes from "./routes/site.routes.js";
import { getAdsTxt, getRobotsTxt } from "./controllers/site.controller.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const corsOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: corsOrigins.includes("*") ? "*" : corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Technira.Space API", database: "mongodb" });
});

app.get("/ads.txt", getAdsTxt);
app.get("/robots.txt", getRobotsTxt);
app.get("/robot.txt", getRobotsTxt);
app.use("/api/site", siteRoutes);
app.use("/api/messages", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

export default app;
