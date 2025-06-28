import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongoConnections";
import isOpen from "@/lib/isOpen";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { deliveryFee } = await request.json();

    // First check if the value is actually changing
    const currentDoc = await isOpen.findOne({});
    if (currentDoc?.delivery === deliveryFee) {
      return NextResponse.json({
        message: "Delivery fee already set to this value",
        success: true,
        current: currentDoc,
      });
    }

    // Force update with current timestamp to ensure modification
    const result = await isOpen.updateOne(
      {},
      {
        $set: {
          delivery: deliveryFee,
          updatedAt: new Date(), // Add this to force modification
        },
      },
      { upsert: true }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      const newDoc = await isOpen.create({ delivery: deliveryFee });
      return NextResponse.json({
        message: "Created new document as update failed",
        success: true,
        created: newDoc,
      });
    }

    return NextResponse.json({
      message: "Updated delivery fee successfully",
      success: true,
      updated: result,
    });
  } catch (error) {
    console.error("Database operation failed:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
