require("dotenv").config();

const express = require("express");
const cors = require("cors");

// set up db connection
const mongoose = require("mongoose");
const uri = process.env.DB_URI;
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

// routes
const jobs = require("./routes/api/jobs");

const app = express();

// middleware set up
app.use(cors()); // enable all CORS requests
app.use(express.json());

// routes set up
app.use("/api/jobs", jobs);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}/`)
);
