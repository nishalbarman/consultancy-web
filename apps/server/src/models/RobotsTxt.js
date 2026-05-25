import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const robotsTxtSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
  },
  siteSchemaOptions
);

export const RobotsTxt = mongoose.model("RobotsTxt", robotsTxtSchema);
