import mongoose from "mongoose";

export async function connectDB(){
  try {
    await mongoose.createConnection(process.env.MONGODB_URI!);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
    process.exit(1);
  }
};
