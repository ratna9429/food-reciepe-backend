// const express = require("express");
// const UserModel = require("../models/User");
// const bcrypt = require("bcrypt");

// const router = express.Router();

// router.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   const user = UserModel.findOne({ username });
//   if (user) {
//     return res.json({ message: "user existed" });
//   }
//   const hashpassword = bcrypt.hash(password, 10);
//   const newuser = new userModel({ username, password: hashpassword });
//   newuser.save();
//   return res.json({ message: "record saved" });
// });

// module.exports = router;

const express = require("express");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashPassword });
    await newUser.save();
    return res.json({ message: "Record saved" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "wrong credentials" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "wrong credentials" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.cookie("token", token);
  return res.json({ message: "successfully login", id: user._id });
});

module.exports = router;
