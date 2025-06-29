import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    await connect();

    await UserOrders.findOneAndUpdate(
      { userId: userId },
      { status: "cancelled" }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
