import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = NextResponse.json({
    message: "cookies sent successfully",
  });

  let data = request.cookies.get("bakeryCart");
  data = JSON.parse(data?.value as string);

  return NextResponse.json({
    message: "cookies sent successfully",
    cartCookies: data,
  });
}
