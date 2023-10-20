const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed.' });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed.' });
      }
  
      // Verify user credentials
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed.' });
      }
  
      // Generate a JWT token and send it in the response
      const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed.' });
    }
  };
  