const mongoose = require("mongoose"); //import mongoose
const bcrypt = require("bcrypt");

// User schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, require: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // IDs of friends
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // IDs of pending friend requests
    // other fields and methods
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password,10);
      user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema); //convert to model named User
module.exports = User; //export for controller use
