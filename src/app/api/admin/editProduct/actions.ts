"use server";

import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export async function editProduct(formData: FormData) {
  const productName = formData.get("productName") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const discountedPrice = Number(formData.get("discountedPrice"));
  const offer = formData.get("offer") === "yes";
  const imageFile = formData.get("imageURL") as File;
  const descriptions = [
    formData.get("desc1"),
    formData.get("desc2"),
    formData.get("desc3"),
    formData.get("desc4"),
    formData.get("desc5"),
  ].filter(Boolean) as string[];

  let imageUrl = "";
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadToCloudinary(imageFile);
  }

  const finalImageUrl = imageUrl;

  const product = {
    productName,
    price,
    category,
    discountedPrice: discountedPrice || null,
    imageUrl: finalImageUrl,
    descriptions,
    offer,
  };

  console.log("Updated Product:", product);

  try {
    await connect();
    await Products.findOneAndUpdate({ productName }, product);
    return { success: true };
  } catch (error) {
    console.error("MongoDB update error:", error);
    return { success: false, error: "Database update failed" };
  }
}

// ✅ Upload helper
async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
}
