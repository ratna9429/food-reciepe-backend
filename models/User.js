// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const UserModel = mongoose.model("users", UserSchema);
// module.exports = UserModel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema); // Change "users" to "User" for consistency
module.exports = UserModel;
