import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    const shopStatus = await isOpen.findOne({});

    return NextResponse.json(
      { message: "Successful", shopStatus, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
