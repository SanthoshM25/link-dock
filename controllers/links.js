const User = require("../models/User");

exports.updateLinks = (req, res) => {
  const data = req.body;
  if (data.link === "" || data.linkTitle === "") {
    User.findOneAndUpdate(
      { email: data.email },
      {
        title: data.title,
      }
    )
      .then(() => {
        res.send("Title updated");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Title updation failed");
      });
  } else {
    User.findOneAndUpdate(
      { email: data.email },
      {
        $push: { links: { link: data.link, title: data.linkTitle } },
        title: data.title,
      }
    )
      .then(() => {
        res.send("Link updated");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Link updation failed");
      });
  }
};

exports.deleteLink = (req, res) => {
  const data = req.body;
  User.findOneAndUpdate(
    {
      email: data.email,
    },
    {
      $pull: { links: { link: data.link, title: data.linkTitle } },
    }
  )
    .then(() => {
      res.send("Deleted successfully");
    })
    .catch((err) => {
      res.status(404).send("something went wrong");
    });
};

exports.getLinks = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    if (user) {
      res.send({
        title: user.title,
        links: user.links,
      });
    } else {
      res.status(404).send("Something went wrong");
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
};
