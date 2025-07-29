// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import employeeRoutes from './routes/employeeRoutes.js'; // note the .js extension
// import authRoutes from './routes/authRoutes.js';


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ Connected to MongoDB Atlas'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// app.use('/api/employees', employeeRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true                // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

