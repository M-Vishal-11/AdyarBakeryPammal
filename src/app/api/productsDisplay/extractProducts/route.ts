import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await connect();
    const productData = await Products.find({ category })
      .sort({ available: -1 })
      .select("-category -_id -offer");

    return NextResponse.json({
      message: "Extracted Products data successfully",
      success: true,
      productData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error", error });
  }
}
