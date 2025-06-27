import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { productName, available } = await request.json();
    // console.log("Incoming request:", { productName, available });

    await connect();
    // console.log("MongoDB connected");

    const existing = await Products.findOne({ productName });
    if (!existing) {
      console.log("Product not found");
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updated = await Products.findOneAndUpdate(
      { productName },
      { available: available },
      { new: true }
    );

    // console.log("Updated product:", updated);

    return NextResponse.json({
      message: "Toggled availability successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
