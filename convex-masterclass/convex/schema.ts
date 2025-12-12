import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Include Convex Auth's required tables (accounts, sessions, etc.).
export default defineSchema({
  ...authTables,
  todos: defineTable({
    title: v.string(),
    completed: v.boolean(),
    userId: v.id("users")
  })
});

