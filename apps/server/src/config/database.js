import mongoose from "mongoose";

export async function connectDatabase() {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    throw new Error(
      "MONGODB_URL is required. Add it to server/.env before starting the API.",
    );
  }

  await mongoose.connect(MONGODB_URL);
  console.log("MongoDB connected");
}
