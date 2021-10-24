require("dotenv").config();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { use } = require("../routes/auth");

exports.signup = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    res.send({ message: "Email already exists" });
  } else {
    const encryPass = CryptoJS.AES.encrypt(user.password, process.env.ENC_KEY);
    const dbUser = new User({
      userName: user.userName,
      email: user.email,
      password: encryPass,
      title: user.userName,
    });
    dbUser
      .save()
      .then((user) => {
        res.send({
          message: "User signed up successfuly",
          data: { email: user.email, id: user._id },
        });
      })
      .catch((err) => {
        res.send({ message: "User signup failed" });
      });
  }
};

exports.signin = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    const password = CryptoJS.AES.decrypt(
      existingUser.password,
      process.env.ENC_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (existingUser.email === user.email && password === user.password)
      res.send({
        message: "Signed in successfully",
        data: {
          email: existingUser.email,
          id: existingUser._id,
        },
      });
  } else res.send({ message: "Email/Password wrong" });
};
