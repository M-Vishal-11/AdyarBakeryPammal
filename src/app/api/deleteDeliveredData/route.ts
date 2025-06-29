import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await connect();

    await UserOrders.deleteMany({ status: "delivered" });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/pusher/send-order:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
