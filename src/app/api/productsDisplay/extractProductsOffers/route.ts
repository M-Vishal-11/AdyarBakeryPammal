import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    await connect();
    const productData = await Products.find({ category })
      .find({
        offer: true,
      })
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
