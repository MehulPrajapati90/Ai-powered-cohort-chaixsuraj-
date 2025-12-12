import { z } from "zod";


export const createTodoSchema = z.object({
  title: z.string().min(3, "Todo must contain at least 3 characters"),
  completed: z.boolean().default(false).optional(),
});

export const updateTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Todo must contain at least 3 characters"),
  completed: z.boolean(),
});

export const deleteTodoSchema = z.object({
  id: z.string(),
});