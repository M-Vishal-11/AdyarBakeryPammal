import { connect } from "@/lib/mongoConnections";
import Users from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userID = searchParams.get("userID");
  if (!userID) {
    return NextResponse.json({ Message: "userId is missing" });
  }

  try {
    await connect();

    const userObj = await Users.find({ userId: userID });

    return NextResponse.json({
      message: "executed successfully",
      success: true,
      userObj,
    });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
}
