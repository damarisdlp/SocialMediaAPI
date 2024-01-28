//import user model
const User = require("../models/users");
const bcrypt = require("bcrypt");


// addUser function for POST user route
const addUser = async (req, res, next) => {
  try {
    const addUser = await User.findOne({ username: req.body.username });

    if (!addUser) {
      const newUserData = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      await newUserData.save();
      res.json({ message: "Data added" });
    } else {
      res.status(409).json({ message: "User already exist in the database" });
    }
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = req.params.username;
    const data = await User.findOne({ username: user });

    if (data) {
      const responseData = {
        ...data.toObject(),
      };

      res.json(responseData);
    } else {
      res.json({ message: "No user exists" });
    }
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const upUsername = req.params.username;
    const upName = req.body.name;
    const upEmail = req.body.email;
    const upPassword = req.body.password;

    const existingUsername = await User.findOne({ username: upUsername });

    if (!existingUsername) {
      return res.status(404).send("No user under that username exists");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(upPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { username: upUsername },
      { $set: { name: upName, email: upEmail, password: hashedPassword } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.params.username;
    const data = await User.findOneAndDelete({ username: user });

    if (data) {
        res.json({ message: 'User deleted successfully.' });
    } else {
        res.status(404).json({ message: 'No user found to delete.' });
    }
} catch (error) {
    console.error('Error:', error);
    next(error);
}
};

module.exports = { addUser, getUser, updateUser, deleteUser };
