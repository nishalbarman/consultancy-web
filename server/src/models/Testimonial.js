import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: String,
    role: String,
    quote: String,
  },
  siteSchemaOptions
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
