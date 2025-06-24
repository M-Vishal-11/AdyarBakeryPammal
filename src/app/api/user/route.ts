import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const user = await auth();
  console.log(user);
  return NextResponse.json({ message: "message", success: true });
}
