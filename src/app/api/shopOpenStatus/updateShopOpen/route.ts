import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    await connect();

    await isOpen.updateOne({}, { isOpen: data.isShopOpen });
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

  return NextResponse.json(
    { message: "Updated Successfully", success: true },
    { status: 200 }
  );
}
