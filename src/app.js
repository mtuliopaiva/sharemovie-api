import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((error) => console.error("ERROR TO CONNECT MongoDB:", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER RUNNING - PORT:  ${PORT}`));
