"use server";

import { auth } from "@/lib/auth";
import client from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentRazorpayStatus = async () => {
    const user = await auth.api.getSession({
        headers: await headers(),
    })

    if(!user) {
        redirect('/sign-in');
    }

    const dbuser = await client.user.findUnique({
        where: {
            id: user?.user?.id,
        },
        select: {
            razorpayPlan: true
        }
    })

    return dbuser?.razorpayPlan;
}