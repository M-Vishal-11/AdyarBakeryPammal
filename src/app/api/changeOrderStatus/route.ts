import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    await connect();

    const res1 = await UserOrders.find(
      { orderId: orderId },
      { status: 1, _id: 0 }
    );

    if (res1[0].status === "cancelled") {
      return NextResponse.json({ success: false });
    }

    await UserOrders.findOneAndUpdate({ orderId: orderId }, { status: status });

    return NextResponse.json({
      Message: "Changed status successfully",
      success: true,
    });
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
