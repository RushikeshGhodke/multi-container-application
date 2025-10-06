import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import app from './app.js';

configDotenv();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));