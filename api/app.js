import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import jobRoutes from "./routes/api/jobs.js";
import userRoutes from "./routes/api/user/user.js";
import cors from "cors";

dotenv.config();

// set up db connection
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.DB_URI_TEST
    : process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // autoIndex: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

// middleware set up
app.use(cors()); // enable all CORS requests
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// routes set up
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);

export default app;
