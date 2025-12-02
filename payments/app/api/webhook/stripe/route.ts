import client from "@/lib/db";
import { stripe } from "@/config/payments/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get("stripe-signature");

        if (!signature) {
            console.error("❌ No signature");
            return NextResponse.json({ error: "No signature" }, { status: 400 });
        }

        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.error("❌ STRIPE_WEBHOOK_SECRET not set");
            return NextResponse.json(
                { error: "Webhook secret not configured" },
                { status: 500 }
            );
        }

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error: any) {
            console.error(`❌ Webhook signature verification failed: ${error.message}`);
            return NextResponse.json(
                { error: `Webhook Error: ${error.message}` },
                { status: 400 }
            );
        }

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                const userId = session.metadata?.userId;

                console.log("🎉 Checkout completed for user:", userId);

                if (userId && session.customer) {
                    await client.user.update({
                        where: { id: userId },
                        data: {
                            plan: "PREMIUM",
                            stripeCustomerId: session.customer.toString(),
                            stripe_subscription: {
                                upsert: {
                                    where: { userId: userId },
                                    update: { plan: "PREMIUM" },
                                    create: { plan: "PREMIUM" }
                                }
                            }
                        },
                    });

                    console.log(`✅ User ${userId} upgraded to PREMIUM`);
                } else {
                    console.warn("⚠️ Missing userId or customer");
                }
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                console.log("🔻 Subscription deleted:", customerId);

                const user = await client.user.findFirst({
                    where: { stripeCustomerId: customerId.toString() },
                });

                if (user) {
                    await client.user.update({
                        where: { id: user.id },
                        data: {
                            plan: "FREE",
                            stripe_subscription: {
                                delete: {
                                    userId: user.id
                                }
                            }
                        },
                    });

                    console.log(`⬇️ User ${user.id} downgraded to FREE`);
                }
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                console.log("🔄 Subscription updated:", customerId);

                if (subscription.status === "active") {
                    const user = await client.user.findFirst({
                        where: { stripeCustomerId: customerId.toString() },
                    });

                    if (user && user.plan !== "PREMIUM") {
                        await client.user.update({
                            where: { id: user.id },
                            data: {
                                plan: "PREMIUM",
                                stripe_subscription: {
                                    update: {
                                        plan: "PREMIUM"
                                    }
                                }
                            },
                        });
                        console.log(`✅ User ${user.id} subscription activated`);
                    }
                }
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error(`❌ Error handling webhook:`, error);
        return NextResponse.json(
            { error: "Webhook handler failed", details: error.message },
            { status: 500 }
        );
    }
}