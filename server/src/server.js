import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from '../routes/user.js';
import categoryRoutes from '../routes/category.js';

import connectDB from '../db/connect.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/category', categoryRoutes);

app.get('/', async (req, res) => {
  res.send('Hello World');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
