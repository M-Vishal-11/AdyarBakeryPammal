import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import Users from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { orderId } = await request.json();
  if (!orderId) {
    return NextResponse.json({ message: "orderId not found" });
  }
  try {
    await connect();

    const res = await UserOrders.findOne(
      { orderId: orderId },
      {
        userId: 1,
        payment: 1,
        isPaid: 1,
        razorpayOrderId: 1,
        razorpayPaymentId: 1,
        razorpaySignature: 1,
      }
    );
    const res2 = await Users.findOne({ userId: res.userId });

    return NextResponse.json({
      message: "sent successfully",
      userData: res2,
      orderData: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}
