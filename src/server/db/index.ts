import {
  drizzle as pgDrizzle,
  type PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import {
  drizzle as neonDrizzle,
  type NeonHttpDatabase,
} from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

let db: PostgresJsDatabase<typeof schema> | NeonHttpDatabase<typeof schema>;

if (env.NODE_ENV !== "production") {
  /**
   * Cache the database connection in development. This avoids creating a new connection on every HMR
   * update.
   */
  const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
  };

  const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
  globalForDb.conn = conn;

  console.log("Using the PG Driver!");
  db = pgDrizzle(conn, { schema });
} else {
  console.log("Using the NEON Driver!");
  db = neonDrizzle(neon(env.DATABASE_URL), { schema });
}

export { db };
