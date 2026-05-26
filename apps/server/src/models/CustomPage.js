import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const customPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, default: "" },
    type: { type: String, enum: ["rich-text", "plain-text"], default: "rich-text" },
  },
  siteSchemaOptions
);

customPageSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

export const CustomPage = mongoose.model("CustomPage", customPageSchema);
