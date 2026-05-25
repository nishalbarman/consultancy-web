import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const adsTxtSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
  },
  siteSchemaOptions
);

export const AdsTxt = mongoose.model("AdsTxt", adsTxtSchema);
