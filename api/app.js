require("dotenv").config();

const express = require("express");
const cors = require("cors");

// set up db connection
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6yne7.mongodb.net/orbital-2021?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routes
const posts = require("./routes/api/posts");

const app = express();

// middleware set up
app.use(cors()); // enable all CORS requests
app.use(express.json());

// routes set up
app.use("/api/posts", posts);

// const port = process.env.PORT || 5000;

// app.listen(port, () =>
//   console.log(`Server started on http://localhost:${port}/`)
// );

module.exports = app;
