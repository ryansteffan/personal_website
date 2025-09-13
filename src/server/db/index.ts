// import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
// import { drizzle as neonDrizzle } from "drizzle-orm/neon-http";
// import postgres from "postgres";

// import { env } from "~/env";
// import * as schema from "./schema";
// import { neon } from "@neondatabase/serverless";

// // let db: PostgresJsDatabase<typeof schema> | NeonHttpDatabase<typeof schema>;
// let db;

// if (env.NODE_ENV !== "production") {
//   /**
//    * Cache the database connection in development. This avoids creating a new connection on every HMR
//    * update.
//    */
//   const globalForDb = globalThis as unknown as {
//     conn: postgres.Sql | undefined;
//   };

//   const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
//   globalForDb.conn = conn;

//   console.log("Using the PG Driver!");
//   db = pgDrizzle(env.DATABASE_URL, { schema });
// } else {
//   console.log("Using the NEON Driver!");
//   const conn = neon(env.DATABASE_URL);
//   db = neonDrizzle(conn, { schema });
// }

// export { db };
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"; // your Drizzle schema

// Neon HTTP client
const sql = neon(process.env.DATABASE_URL!);

// Drizzle instance
export const db = drizzle(sql, { schema });
