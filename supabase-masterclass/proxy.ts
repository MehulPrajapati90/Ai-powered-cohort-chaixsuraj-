import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

async function proxy(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

    const supabase = await createClient();

    await supabase.auth.getUser();

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};

export default proxy;