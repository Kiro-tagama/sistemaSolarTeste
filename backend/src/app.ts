import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import planetRoutes from "./routes/planet";
import { authenticateToken } from "./middleware/auth";
import { json } from "stream/consumers";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("server on");
});
app.use("/login", authRoutes);
app.use("/planets", authenticateToken, planetRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
