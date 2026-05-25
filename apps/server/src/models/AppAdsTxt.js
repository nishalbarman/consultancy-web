import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const appAdsTxtSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
  },
  siteSchemaOptions
);

export const AppAdsTxt = mongoose.model("AppAdsTxt", appAdsTxtSchema);
