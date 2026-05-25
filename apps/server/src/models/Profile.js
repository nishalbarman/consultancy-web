import mongoose from "mongoose";
import { siteSchemaOptions } from "./schemaOptions.js";

const profileSchema = new mongoose.Schema(
  {
    brand: String,
    tagline: String,
    headline: String,
    intro: String,
    email: String,
    phone: String,
    location: String,
    playStoreUrl: String,
    githubUrl: String,
    linkedinUrl: String,
    aboutHeadline: String,
    aboutIntro: String,
    processTitle: String,
    processSummary: String,
    heroCodeLines: [String],
    stats: [{ label: String, value: String }],
  },
  siteSchemaOptions
);

export const Profile = mongoose.model("Profile", profileSchema);
