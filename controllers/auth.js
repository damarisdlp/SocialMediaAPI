const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");

// Controller function to authenticate user
const authenticate = async (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  if (!userName) {
    return res.status(400).json({ message: '"username" is required' });
  }
  if (!passWord) {
    return res.status(400).json({ message: '"password" is required' });
  }
  // Find the user by username
  const user = await User.findOne({ username: userName });
  // If the user doesn't exist return an error
  if (!user) {
    return res.status(401).json({ message: "Username is incorrect" });
  }
  const validPassword = await bcrypt.compare(passWord, user.password);

  //If password isn't valid, return an error
  if (!validPassword) {
    console.log(passWord)
    console.log(user.password)

    return res.status(401).json({ message: "Password is incorrect" });
  }

  // Generate a JWT token with the user ID as payload
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // Return the token as JSON
  res.json({ token });
};

module.exports = { authenticate };
