import dotenv from 'dotenv';

import express from 'express';
import mongoose from 'mongoose';
import jobRoutes from './routes/api/jobs.js';
import cors from 'cors';

dotenv.config();

// set up db connection
const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // autoIndex: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

// middleware set up
app.use(cors()); // enable all CORS requests
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// routes set up
app.use('/api/jobs', jobRoutes);
app.use('/', (req, res) => res.send('SERVER IS RUNNING'));

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}/`)
);
