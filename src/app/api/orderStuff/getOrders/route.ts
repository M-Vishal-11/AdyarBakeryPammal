import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json({ message: "userId not found" });
  }
  try {
    await connect();

    const res = await UserOrders.findOne({ userId: userId });

    return NextResponse.json({ message: "sent successfully", order: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}
