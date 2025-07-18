import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let data = null;

  if (request.cookies.has("bakeryCart")) {
    try {
      data = JSON.parse(request.cookies.get("bakeryCart")?.value as string);
    } catch (error) {
      console.error("Invalid cookie JSON:", error);
      data = [];
    }
  }

  return NextResponse.json({
    message: "cookies sent successfully",
    cartCookies: data ?? [],
  });
}
