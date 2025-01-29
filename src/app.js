import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/database.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER RUNNING - PORT:  ${PORT}`));
