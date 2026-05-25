import "dotenv/config";
import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.js";
import { seedIfEmpty } from "../src/database/seed.js";

let bootstrapPromise;

async function bootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = connectDatabase().then(async () => {
      await seedIfEmpty();
    });
  }

  return bootstrapPromise;
}

export default async function handler(req, res) {
  await bootstrap();
  return app(req, res);
}
