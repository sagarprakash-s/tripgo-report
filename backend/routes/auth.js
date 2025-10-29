const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName, phoneNumber } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({ username, email, password, fullName, phoneNumber });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful', 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        fullName: user.fullName 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;