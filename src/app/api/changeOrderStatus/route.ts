import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    await connect();

    const res = await UserOrders.findOneAndUpdate(
      { orderId: orderId },
      { status: status }
    );

    return NextResponse.json({
      Message: "Changed status successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}
