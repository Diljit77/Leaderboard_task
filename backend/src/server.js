import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userroutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/users", userRoutes);
const port=process.env.PORT ||3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
