import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
      throw new Error("MongoDB connection failed: " + error.message);
    } else {
      console.error("Unknown MongoDB connection error:", error);
      throw new Error("MongoDB connection failed due to unknown error.");
    }
  }
}
