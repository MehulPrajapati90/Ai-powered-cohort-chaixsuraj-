import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";

// Include Convex Auth's required tables (accounts, sessions, etc.).
export default defineSchema({
  ...authTables,
});

