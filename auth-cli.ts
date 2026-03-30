import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthConfig } from "@/lib/auth/auth.config";

export const auth = betterAuth({
  ...createAuthConfig(),
  database: drizzleAdapter(
    {},
    {
      provider: "sqlite",
    },
  ),
});
