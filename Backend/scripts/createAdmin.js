import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
    } else {
      const admin = new Admin({
        username: 'admin',
        password: 'admin123'  // will be hashed automatically
      });
      await admin.save();
      console.log('✅ Admin created successfully');
    }
    mongoose.disconnect();
  })
  .catch(err => console.error('MongoDB error:', err));
