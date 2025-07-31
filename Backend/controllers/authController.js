import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,       // ✅ Required for HTTPS (Render)
      sameSite: 'None',   // ✅ Required for cross-site cookies
      maxAge: 60 * 60 * 1000, // 1 hour
    });


    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = (req, res) => {
  const user = req.user; // set by authMiddleware
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ user });
};
