import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTodos = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const todos = await ctx.db
            .query("todos")
            .filter((q) => q.eq(q.field("userId"), userId))
            .collect();

        return todos.reverse();
    },
});

export const createTodo = mutation({
    args: {
        title: v.string(),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        return ctx.db.insert("todos", {
            title: args.title,
            completed: args.completed,
            userId,
        });
    },
});

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        title: v.string(),
        completed: v.boolean(),
    },

    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const existingTodo = await ctx.db.get(args.id);

        if (existingTodo?.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return ctx.db.patch(args.id, {
            title: args.title,
            completed: args.completed
        })
    },
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const existingTodo = await ctx.db.get(args.id);

        if (existingTodo?.userId !== userId) {
            throw new Error("Unauthorized");
        }
        return ctx.db.delete(args.id)
    }
});