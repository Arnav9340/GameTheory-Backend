// User Controller
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password, role: 'customer', username });
    const token = user.generateToken();
    res.status(201).json({ user : {
      id : user._id,
      email : user.email,
      username: user.username,
      role : user.role
    }, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateToken();
    res.status(200).json({ user : {
      id : user._id,
      email : user.email,
      username: user.username,
      role : user.role
    },  token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, loginUser };