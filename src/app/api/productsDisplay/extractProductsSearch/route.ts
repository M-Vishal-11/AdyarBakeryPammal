import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchVal } = await request.json();

  if (!searchVal) {
    return NextResponse.json({ success: true, empty: true });
  }

  try {
    await connect();
    const regex = new RegExp(`^${searchVal}`, "i");

    const productData = await Products.find({
      productName: { $regex: regex },
    })
      .sort({ available: -1 })
      .limit(20);

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
