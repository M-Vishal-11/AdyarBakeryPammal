import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    const data = await isOpen.find({}, { delivery: 1 });

    return NextResponse.json({
      success: true,
      message: "Connected and fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, message: "DB connection failed", error },
      { status: 500 }
    );
  }
}
