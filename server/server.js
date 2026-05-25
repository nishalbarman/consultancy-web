import "dotenv/config";
import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";
import { seedIfEmpty } from "./src/database/seed.js";

const PORT = process.env.PORT || 8000;

await connectDatabase();
await seedIfEmpty();

app.listen(PORT, () => {
  console.log(`Technira.Space API running at http://localhost:${PORT}`);
});
