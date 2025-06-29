import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
): string => {
  const keySecret = process.env.RAZORPAY_SECRET_ID as string;
  return crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
};

export async function POST(request: NextRequest) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connect();

    const expectedSignature = generatedSignature(orderId, razorpayPaymentId);
    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // ✅ Mark payment as successful
    await UserOrders.findOneAndUpdate(
      { userId },
      {
        payment: "online",
        isPaid: true,
        razorpayOrderId: orderId,
        razorpayPaymentId: razorpayPaymentId,
        razorpaySignature: razorpaySignature,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Payment verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
