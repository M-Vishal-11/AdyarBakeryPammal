import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

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
