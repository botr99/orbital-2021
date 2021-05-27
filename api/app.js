const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6yne7.mongodb.net/orbital-2021?retryWrites=true&w=majority`;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

module.exports = app;
