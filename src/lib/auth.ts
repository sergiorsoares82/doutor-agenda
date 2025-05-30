import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    usePlural: true, // Use plural table names
  }),
  user: {
    modelName: "usersTable", // The name of the user model
  },
  session: {
    modelName: "sessionsTable", // The name of the session model
  },
  account: {
    modelName: "accountsTable", // The name of the account model
  },
  verification: {
    modelName: "verificationsTable", // The name of the verification model
  },
  //... the rest of your config
});
