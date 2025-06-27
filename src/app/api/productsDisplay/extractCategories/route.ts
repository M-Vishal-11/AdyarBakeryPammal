import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    const categories = await Products.distinct("category");

    return NextResponse.json({
      message: "sent successfully",
      success: true,
      categories,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
