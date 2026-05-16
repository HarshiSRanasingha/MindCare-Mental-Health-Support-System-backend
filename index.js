import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import counselorRoutes from "./routes/counselorRoutes.js";

import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();

const app = express();


// DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/counselors", counselorRoutes);

app.use("/api/requests", requestRoutes);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send("Mental Health Support API Running");
});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});