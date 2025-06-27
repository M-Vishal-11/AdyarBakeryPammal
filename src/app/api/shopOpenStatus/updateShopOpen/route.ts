import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    await connect();

    await isOpen.updateOne({}, { isOpen: data.isShopOpen });
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Updated Successfully", success: true },
    { status: 200 }
  );
}
