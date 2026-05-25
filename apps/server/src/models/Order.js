import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceTitle: { type: String, required: true },
    projectName: { type: String, required: true },
    description: String,
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["requested", "confirmed", "in-progress", "delivered", "cancelled"],
      default: "requested",
    },
    timeline: String,
  },
  siteSchemaOptions
);

export const Order = mongoose.model("Order", orderSchema);
