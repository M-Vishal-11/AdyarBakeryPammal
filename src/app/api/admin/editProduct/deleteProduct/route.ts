import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { productName } = await request.json();
  try {
    await connect();
    const product = await Products.deleteOne({ productName });
    // console.log(product);
    return NextResponse.json({
      message: "Deleted successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error connecting to db", error });
  }
}
