import express from "express";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import siteRoutes from "./routes/site.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Technira.Space API", database: "mongodb" });
});

app.use("/api/site", siteRoutes);
app.use("/api/messages", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

export default app;
