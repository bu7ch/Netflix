const jwt = require("jsonwebtoken");
require("dotenv/config");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET,{expiresIn: '1h'})
    res.json(token)
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { addUser, login };
