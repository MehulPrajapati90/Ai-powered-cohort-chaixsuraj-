"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import { users } from "../schema";
import { desc, eq } from "drizzle-orm";

export const createUser = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");

    if (typeof name !== "string" || typeof email !== "string") {
        throw new Error("Invalid form data");
    }

    await db.insert(users).values({
        name,
        email,
    });

    revalidatePath("/");
};

export const getAllUsers = async () => {
    const getUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    return getUsers || [];
}

export const getUserById = async (id: string) => {
    const getUser = await db.select().from(users).where(eq(users.id, id));

    revalidatePath("/");

    return getUser || null;
}

export const updateUser = async (id: string, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const isActive = formData.get("isActive");

    if (typeof name !== "string" || typeof email !== "string" || typeof isActive !== "boolean") {
        throw new Error("Invalid form data");
    }

    await db.update(users).set({
        name,
        email,
        isActive,
    }).where(eq(users.id, id));

    revalidatePath("/");
}

export const deleteUser = async (id: string) => {
    await db.delete(users).where(eq(users.id, id));

    revalidatePath("/");
}