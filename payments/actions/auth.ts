"use server";

import client from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const currentUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return null;
        }

        const user = await client.user.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                plan: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};