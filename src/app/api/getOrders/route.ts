import { connect } from "@/lib/mongoConnections";
import UserOrders from "@/lib/userOrders";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    const res = await UserOrders.find();

    return NextResponse.json({ message: "sent successfully", orders: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}
