import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await connect();

    await Products.create({
      productName: data.productName,
      price: data.price,
      category: data.category,
    });

    return NextResponse.json({ message: "sentSuccessfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ message: "Error", details: error.message });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ message: "Unknown error occurred" });
    }
  }
}
