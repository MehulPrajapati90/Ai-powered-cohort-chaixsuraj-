import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import client from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const data = JSON.parse(body);

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userId,
        } = data;

        const secret = process.env.RZP_KEY_SECRET

        const generatedSignature = crypto
            .createHmac("sha256", secret!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({
                success: false,
                message: "Payment verification failed"
            }, { status: 400 });
        };

        await client.user.update({
            where: {
                id: userId
            },
            data: {
                razorpayPlan: "PREMIUM"
            }
        })

        return NextResponse.json({
            success: true,
            message: "Payment successful and user updated!"
        });

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Failed to create order",
        }, { status: 500 });
    }
}