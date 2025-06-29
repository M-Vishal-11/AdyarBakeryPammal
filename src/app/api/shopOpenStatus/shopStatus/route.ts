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
