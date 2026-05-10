import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import connectDB from './db/db.js';

import userRoutes from './routes/userRoutes.js';

import counselorRoutes from './routes/counselorRoutes.js';

import requestRoutes from './routes/requestRoutes.js';

dotenv.config();

const app = express();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// DATABASE

connectDB();

// ROUTES

app.use('/api', userRoutes);

app.use('/api', counselorRoutes);

app.use('/api', requestRoutes);

// TEST ROUTE

app.get('/', (req, res) => {

  res.send('Mental Health API Running');

});

// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});