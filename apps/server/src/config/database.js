import mongoose from "mongoose";

let connectionPromise;

export async function connectDatabase() {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    throw new Error(
      "MONGODB_URL is required. Add it to server/.env before starting the API.",
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGODB_URL).then((connection) => {
      console.log("MongoDB connected");
      return connection.connection;
    });
  }

  return connectionPromise;
}
