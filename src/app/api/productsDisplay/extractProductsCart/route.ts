import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productNames } = await request.json();

    if (!Array.isArray(productNames) || productNames.length === 0) {
      return NextResponse.json(
        { message: "No product names provided", success: false },
        { status: 400 }
      );
    }

    await connect();

    const productData = await Products.find({
      productName: { $in: productNames },
    }).select("-category -_id -offer");

    return NextResponse.json({
      message: "Extracted Products data successfully (by names)",
      success: true,
      productData,
    });
  } catch (error) {
    console.error("POST /extractProducts error:", error);
    return NextResponse.json(
      { message: "Server Error", success: false, error },
      { status: 500 }
    );
  }
}
