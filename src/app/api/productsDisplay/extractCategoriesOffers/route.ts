import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    let categories = await Products.find({
      offer: true,
    }).distinct("category");

    categories = categories.sort();

    return NextResponse.json({
      message: "sent successfully",
      success: true,
      categories,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
