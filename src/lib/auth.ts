import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    usePlural: true, // Use plural table names
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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
  emailAndPassword: {
    enabled: true, // Enable email and password authentication
  },
  //... the rest of your config
});
