import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName } = body;

    await connect();
    const productData = await Products.find({ productName }).select("-_id");

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
