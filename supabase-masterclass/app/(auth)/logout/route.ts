import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
    const supabse = await createClient();
    await supabse.auth.signOut();

    redirect("/signin")
}