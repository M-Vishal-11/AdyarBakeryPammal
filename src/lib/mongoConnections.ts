import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected mongodb");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed: " + error);
  }
}
