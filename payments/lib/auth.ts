import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client from "./db";
import { env } from "./env";
import { polarClient } from "@/config/payments/polar";
import { polar, checkout, portal } from "@polar-sh/better-auth";


export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),

    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }
    },

    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "8b2247cf-6520-4817-925c-71ad49b4e14f",
                            slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/a-new-saas
                        },
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,
                }),
            ],
        }),

        // @ts-ignore
        portal()
    ],
});