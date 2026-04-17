import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const db = process.env.DATABASE_URL
  ? drizzle({
      client: neon(process.env.DATABASE_URL),
    })
  : null;
