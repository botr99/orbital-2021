import dotenv from 'dotenv';

import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { categories, organizations, titles } from './seedHelpers.js';

dotenv.config({ path: '../.env' });

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database connected, now seeding...');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const removeDupes = (array) => [...new Set(array)];
// Clears existing data
const seedDB = async () => {
  await Job.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const job = new Job({
      organizer: `${sample(organizations)}`,
      categories: removeDupes([
        `${sample(categories)}`,
        `${sample(categories)}`,
      ]),
      title: `${sample(titles)}`,
      purpose:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id nisi nisi. Curabitur erat ligula, luctus sit amet tincidunt a, convallis et turpis. Etiam suscipit feugiat dolor, nec ornare nisl. Sed eu massa nisl. Vivamus non magna vel felis egestas dictum eget at dui. Vestibulum dapibus porttitor nisl, maximus tristique ante dapibus sed. Duis sodales sollicitudin enim ut posuere. ',
    });
    await job.save();
  }
};

seedDB().then(() => {
  console.log('Finished seeding');
  mongoose.connection.close();
});
