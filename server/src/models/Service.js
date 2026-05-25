import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    title: String,
    summary: String,
    price: String,
    features: [String],
  },
  siteSchemaOptions
);

export const Service = mongoose.model("Service", serviceSchema);
