import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    const payment = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
    return NextResponse.json(payment);
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
