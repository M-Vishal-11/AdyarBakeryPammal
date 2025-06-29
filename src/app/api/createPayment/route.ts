import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
});

export async function POST(request: NextRequest) {
  try {
    const { selectedPayment } = await request.json();

    // Validate selectedPayment
    if (!["cash", "online"].includes(selectedPayment)) {
      return NextResponse.json(
        { message: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not logged in" },
        { status: 401 }
      );
    }

    // Connect to DB
    await connect();

    if (selectedPayment === "cash") {
      // Update order as cash payment
      await UserOrders.findOneAndUpdate(
        { userId },
        { payment: "cash" },
        { new: true }
      );

      return NextResponse.json({ cash: true });
    }

    // For online payments: get total amount
    const res = await UserOrders.findOne({ userId });

    if (!res || !res.totalAmount) {
      return NextResponse.json(
        { message: "Order not found or invalid total amount" },
        { status: 400 }
      );
    }

    const orderAmount = res.totalAmount * 100; // Razorpay expects paisa

    // Create Razorpay order
    const payment = await razorpay.orders.create({
      amount: orderAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json(payment);
  } catch (error: unknown) {
    console.error("Payment creation error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
