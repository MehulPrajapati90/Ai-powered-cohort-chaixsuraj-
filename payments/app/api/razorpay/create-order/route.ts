import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RZP_PUBLISHABLE_KEY,
    key_secret: process.env.RZP_KEY_SECRET,
});

console.log(razorpay);

export async function POST() {
    try {
        const options = {
            amount: 900,
            currency: "INR",
            receipt: "receipt" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            orderId: order?.id,
            amount: order.amount,
            currency: order.currency
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Failed to create order",
        }, { status: 500 });
    }
};