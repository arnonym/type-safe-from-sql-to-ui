import * as path from "path";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./database.ts";

export async function migrateToLatest() {
  console.log("Running migrations...");
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });
  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((it) => {
    switch (it.status) {
      case "Success":
        console.log(`Migration "${it.migrationName}" executed successfully`);
        break;
      case "Error":
        console.error(`Failed to execute migration "${it.migrationName}"`);
        break;
    }
  });
  if (error) {
    console.error("Failed to migrate!");
    console.error(error);
    process.exit(1);
  }
  console.log("Migrations finished.");
}

if (import.meta.main) {
  migrateToLatest().catch((e) => console.error(e));
}
