import type { DB } from "./types.ts";
import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "demo",
    host: "localhost",
    user: "demo",
    password: "demo",
    port: 5436,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
