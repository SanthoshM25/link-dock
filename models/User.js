const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: String,
  links: {
    type: [
      {
        title: String,
        link: String,
      },
    ],
  },
});

module.exports = User = mongoose.model("User", UserSchema);
