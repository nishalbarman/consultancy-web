import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, default: "General enquiry" },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  siteSchemaOptions
);

export const Lead = mongoose.model("Lead", leadSchema);
