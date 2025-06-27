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
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
