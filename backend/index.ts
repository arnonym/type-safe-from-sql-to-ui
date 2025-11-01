import { run } from "./src/main.ts";

run().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
