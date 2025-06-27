import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request);
  return NextResponse.json(
    { message: "uploaded successfully", success: true },
    { status: 200 }
  );
}
