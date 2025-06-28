import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl, productName } = await request.json();

    if (!imageUrl || !productName) {
      return NextResponse.json(
        { error: "Image URL and product name are required" },
        { status: 400 }
      );
    }

    await connect();

    const deletedProduct = await Products.findOneAndUpdate(
      { productName },
      { $set: { imageUrl: "" } }
    );

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const result = await deleteCloudinaryImage(imageUrl);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting image/product:", error);
    return NextResponse.json(
      { error: "Failed to delete image/product" },
      { status: 500 }
    );
  }
}

// Helper: Delete image from Cloudinary
async function deleteCloudinaryImage(imageUrl: string) {
  const publicId = getPublicIdFromUrl(imageUrl);
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted image:", result);
    return result;
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}

// Helper: Extract public_id from Cloudinary image URL
function getPublicIdFromUrl(url: string): string {
  const parts = url.split("/upload/");
  const publicIdWithExtension = parts[1].split(".")[0];
  return publicIdWithExtension;
}
