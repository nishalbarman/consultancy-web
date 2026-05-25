import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    title: String,
    type: String,
    summary: String,
    stack: [String],
    url: String,
    playStoreUrl: String,
    featured: Boolean,
  },
  siteSchemaOptions
);

export const Project = mongoose.model("Project", projectSchema);
