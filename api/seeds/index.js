require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Job = require("../models/Job");
const { categories, organizations, titles } = require("./seedHelpers");

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Clears existing data
const seedDB = async () => {
  await Job.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * 10);
    const job = new Job({
      organizer: `${sample(organizations)}`,
      category: `${sample(categories)}`,
      title: `${sample(titles)}`,
      purpose:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id nisi nisi. Curabitur erat ligula, luctus sit amet tincidunt a, convallis et turpis. Etiam suscipit feugiat dolor, nec ornare nisl. Sed eu massa nisl. Vivamus non magna vel felis egestas dictum eget at dui. Vestibulum dapibus porttitor nisl, maximus tristique ante dapibus sed. Duis sodales sollicitudin enim ut posuere. ",
    });
    await job.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
