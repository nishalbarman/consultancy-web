import mongoose from "mongoose";

export function makeId(value) {
  const slug = String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || new mongoose.Types.ObjectId().toString();
}
